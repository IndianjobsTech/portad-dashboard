# PortaD Migration & Adapter Guide

This document explains the PortaD migration workflow, the role of source and target adapters, and how to interpret the compatibility matrix. It is intended for workspace administrators, operators, and open-source contributors.

---

## 1. The Migration Workflow

PortaD follows a local-first, four-step migration pipeline designed to ensure data safety, validation, and zero surprises during workspace transfers.

```
┌─────────────────┐       ┌─────────────────┐       ┌───────────────────┐       ┌─────────────────┐
│     Step 1      │       │     Step 2      │       │      Step 3       │       │     Step 4      │
│  Choose Source  │ ────> │  Choose Target  │ ────> │  Attach Package   │ ────> │  Run Pipeline   │
│ (Where it lives)│       │ (Where it lands)│       │ (Inspect schema)  │       │  (CLI execution)│
└─────────────────┘       └─────────────────┘       └───────────────────┘       └─────────────────┘
```

### Step 1: Choose Source
Identify the platform where your workspace data currently resides.
- **Supported:** Notion (pages, databases, records, attachments, relations) and synthetic **Fixtures demo** (sandbox workspace for testing without credentials).
- **Planned:** Trello (Milestone 0.3), ClickUp (Milestone 0.4), and Asana (Milestone 0.4).

### Step 2: Choose Target
Select the destination workspace platform.
- **Supported:** **Huly** (Unified Import Format workspace).
- **Planned:** Notion (round-trip import back into Notion).

### Step 3: Attach & Inspect Package
Users can inspect or attach an existing `.portad` package. 
- **Privacy Guarantee:** Package inspection in the web dashboard occurs entirely client-side; no workspace files leave your browser.
- **Package Anatomy:** A `.portad` package contains:
  ```text
  notion.portad/
  ├── manifest.json       # SHA-256 checksums and package metadata
  ├── report.json         # Transformation decisions and field-mapping log
  ├── data/               # Canonical entity records
  │   ├── pages.json      # Structured documents and markdown
  │   ├── databases.json  # Database definitions and relation graphs
  │   └── comments.json   # Discussion threads and authors
  └── attachments/        # Binary assets with verified checksums
  ```

### Step 4: Run the Migration
Hosted execution in the web dashboard is staged for future milestones. The UI mirrors the exact 3-command local CLI sequence:
```bash
# 1. Export raw data into canonical intermediate format
portad export notion

# 2. Transform into target schema and generate field-fidelity report
portad transform --target huly

# 3. Ingest records into the target system (supports resuming from checkpoints)
portad import huly --resume
```

---

## 2. Adapter Architecture & Roles

PortaD avoids direct platform-to-platform point solutions ($N \times M$ complexity) by routing all transfers through a canonical, intermediate schema ($N + M$).

```
┌─────────────────────┐
│    Source SaaS      │ (Notion, Trello, etc.)
└──────────┬──────────┘
           │ [Source Adapter: Extract & Normalize]
           ▼
┌─────────────────────┐
│  .portad Canonical  │ (Common representation: pages, databases, comments, files)
└──────────┬──────────┘
           │ [Target Adapter: Map & Ingest]
           ▼
┌─────────────────────┐
│     Target SaaS     │ (Huly, Notion, etc.)
└─────────────────────┘
```

### Source Adapters
Source adapters connect to the origin workspace API or export archive. Their responsibilities include:
1. **Authentication & Discovery:** Validate API tokens and discover accessible databases and pages.
2. **Entity Extraction:** Retrieve structured pages, metadata, block trees, comments, and attachments.
3. **Canonical Normalization:** Map platform-specific concepts into the standard PortaD intermediate representation.
4. **Integrity Hashing:** Compute SHA-256 checksums for all binary assets and manifest records.

### Target Adapters
Target adapters consume canonical `.portad` entities and write them to the destination system:
1. **Schema Mapping:** Map PortaD canonical blocks to the target platform's schema (e.g., Notion rich blocks to Huly Document blocks).
2. **Relation Reconciliation:** Rebuild relational cross-references between migrated databases.
3. **Asset Upload:** Stream attachments with checksum verification.
4. **Idempotent Resumption:** Maintain a checkpoint state allowing interrupted imports to resume safely via `--resume`.

### Field-Level Fidelity Classifications
During `portad transform`, every field and property receives a fidelity rating:
- **`PRESERVED`**: Transferred with 100% fidelity without loss of structure or data.
- **`TRANSFORMED`**: Adapted into the target format with equivalent semantics (e.g., custom callout blocks converted into blockquotes).
- **`UNSUPPORTED`**: The target platform lacks an equivalent capability (logged explicitly in `report.json`).
- **`FAILED`**: Extraction or conversion encountered a parsing or schema validation error.

---

## 3. Understanding the Compatibility Matrix

The dashboard's `/compatibility` route provides a searchable status table of supported and planned platforms.

### Status Definitions
| Status | Meaning | Current Availability |
| :--- | :--- | :--- |
| **`Supported`** | Adapter is built, tested against core schemas, and verified for production/test use. | Available in current CLI release. |
| **`Planned`** | Adapter is scheduled on the roadmap; architecture or API discovery is underway. | In development; target milestone listed in detail. |

### Current Compatibility Overview

#### Sources
| Platform | Status | Entity Types & Details | Target Milestone |
| :--- | :--- | :--- | :--- |
| **Notion** | `Supported` | Pages, databases, records, attachments, relations | Current |
| **Fixtures demo** | `Supported` | Synthetic workspace for local demo & automated tests | Current |
| **Trello** | `Planned` | Boards, lists, cards, checklists, attachments | Milestone 0.3 |
| **ClickUp** | `Planned` | Spaces, folders, lists, tasks, custom fields | Milestone 0.4 |
| **Asana** | `Planned` | Projects, tasks, sections, dependencies | Milestone 0.4 |

#### Targets
| Platform | Status | Details | Target Milestone |
| :--- | :--- | :--- | :--- |
| **Huly** | `Supported` | Unified Import Format workspace | Current |
| **Notion** | `Planned` | Round-trip import | Future |

---

## 4. Practical Migration Scenarios

### Scenario A: Dry Run with Synthetic Fixtures (No Account Needed)
Ideal for evaluating PortaD or verifying local development environments.

1. Generate a sample export from the built-in synthetic fixtures:
   ```bash
   portad export fixtures --output ./demo.portad
   ```
2. Transform the synthetic dataset to Huly's Unified Import Format:
   ```bash
   portad transform --input ./demo.portad --target huly
   ```
3. Inspect `report.json` to verify mapping decisions and field conversions before performing any import.

### Scenario B: Notion to Huly Workspace Migration

1. **Prerequisites:**
   - Notion integration token with read access to target workspaces.
   - Huly workspace credentials or target import archive path.
2. **Execute Export:**
   ```bash
   export NOTION_TOKEN="secret_..."
   portad export notion --workspace "Engineering" --output ./engineering.portad
   ```
3. **Validate & Transform:**
   ```bash
   portad transform --input ./engineering.portad --target huly
   ```
4. **Import to Target:**
   ```bash
   portad import huly --input ./engineering.portad --resume
   ```
   *If network drops or rate limits occur, re-running with `--resume` picks up from the last verified checkpoint without duplicating records.*

---

## 5. Related Documentation & Links

- [Quick Start Guide](../QUICK_START.md) — Local development and environment setup.
- [Product Requirements](PRODUCT_REQUIREMENTS.md) — Dashboard functional requirements and constraints.
- [Engineering Workflow](ENGINEERING_WORKFLOW.md) — PR checklists, test requirements, and delivery standards.
- [Organization Operating Model](ORGANIZATION_OPERATING_MODEL.md) — Cross-repository delivery and release gates.
- [PortaD Core Repository](https://github.com/IndianjobsTech/PortaD) — Core migration engine and CLI implementation.

