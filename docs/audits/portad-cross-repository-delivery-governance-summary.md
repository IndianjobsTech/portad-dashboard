# PortaD Cross-Repository Delivery & Governance --- Public Summary

**Status snapshot:** 11 November 2026\
**Coordination references:** [Dashboard issue
#27](https://github.com/IndianjobsTech/portad-dashboard/issues/27) ·
[Core issue #14](https://github.com/IndianjobsTech/PortaD/issues/14)

> This document is a public-facing summary of delivery coordination and
> verification status. It intentionally excludes private-repository
> implementation details, sensitive security configuration, internal
> access information, and unverified operational claims. It is not a
> security assessment or certification.

## 1. Purpose

The PortaD project coordinates work across the Dashboard and Core
codebases. This summary records the shared delivery approach, completed
baseline activities, and governance topics that still require
confirmation.

The Dashboard repository is used as a public coordination location for
relevant handbooks, setup guidance, and delivery references. The wider
cross-repository coordination is tracked through the project's
designated coordination issue.

## 2. Delivery coordination

The **PortaD Delivery** GitHub Project has been created and is actively
used to track coordination items, sprint work, and pull requests.

The project screenshot reviewed by the team showed: - Work items from
the delivery effort. - Assigned contributors. - Workflow statuses
including **Todo**, **In Progress**, and **Done**. - Sprint tracking and
linked pull-request information.

The project's full configuration, access model, and ownership
arrangement should be confirmed by the project maintainers. Until that
confirmation is documented, the project should not be described as
organization-owned.

## 3. Sprint 0 --- completed

**Sprint 0 (25--28 October 2026) is successfully completed and closed.**

Its objective was to establish a baseline of the existing repositories
and improve visibility of cross-repository delivery work before
subsequent implementation stages.

The completed activities included: - Running and recording Dashboard
baseline quality checks. - Coordinating the Core baseline audit. -
Reviewing existing roadmap work. - Recording responsibility and delivery
coordination information. - Documenting evidence and risks. -
Establishing the initial cross-repository delivery tracking approach.

Sprint 0 is closed. Its completed activities should not be reopened
unless new evidence identifies a specific issue.

## 4. Baseline verification --- summary

The team reported successful local baseline checks for both codebases.

### Dashboard

Two separate local states were tested and their results are
intentionally kept distinct:

  -----------------------------------------------------------------------
  Check                  Official-main baseline      Fork-synced baseline
  ------------------- ------------------------- -------------------------
  Unit tests           65 passed across 6 files  67 passed across 7 files

  Lint                                   Passed                    Passed

  Production build         Passed; 12/12 static      Passed; 12/12 static
                                pages generated           pages generated

  Playwright                           7 passed                  7 passed
  end-to-end tests
  -----------------------------------------------------------------------

The production build used Next.js 16.4.3.

### Core

The local Core baseline results reported by the contributor included: -
Python tests: 182 passed, with one deprecation warning. - Ruff lint:
passed. - Mypy: no issues reported in 46 source files. - Package build:
source distribution and wheel generated successfully. - Isolated wheel
installation and CLI version check: passed.

These are contributor-reported local results from the relevant test
sessions. They should not be interpreted as proof that every check is
mandatory in the official repository's merge settings.

## 5. Continuous integration --- dated audit snapshot

A cross-repository audit dated **4 November 2026** reported active CI
workflows and passing checks in both repositories.

The reported Dashboard workflow included linting, production build, and
unit tests. The reported Core workflow included linting, type checking,
and automated tests.

CI workflow success demonstrates that the workflow ran successfully for
the commits tested at that time. It does not, by itself, demonstrate
that the checks are required before a pull request can be merged.

Test totals in CI and local baseline runs differ because they refer to
different runs, commits, or test scopes. They are therefore recorded
separately rather than combined.

## 6. Cross-repository delivery

The team is coordinating related Dashboard and Core changes through
linked issues and pull requests.

The 4 November audit recorded examples of merged documentation/API work
and draft changes awaiting review. Pull-request states can change;
contributors and reviewers should consult the live repository pages for
current status.

-   [Dashboard
    repository](https://github.com/IndianjobsTech/portad-dashboard)
-   [Core repository](https://github.com/IndianjobsTech/PortaD)
-   [Dashboard delivery workflow issue
    #27](https://github.com/IndianjobsTech/portad-dashboard/issues/27)
-   [Core coordination issue
    #14](https://github.com/IndianjobsTech/PortaD/issues/14)

## 7. Governance topics requiring maintainer confirmation

The following topics remain subject to verification by people with the
appropriate repository or project permissions:

1.  **Project ownership and access:** confirm the project owner,
    visibility, and access for intended contributors.
2.  **Project configuration:** confirm agreed workflow states, fields,
    and coverage of relevant work items.
3.  **Branch protection and rulesets:** confirm the default-branch
    policies for each repository.
4.  **Required reviews and checks:** confirm whether pull-request
    approvals and CI status checks are enforced as merge requirements.
5.  **Branch restrictions:** confirm the agreed restrictions on
    force-pushing and branch deletion.
6.  **Security features:** confirm which repository security features
    are available and enabled, such as dependency alerts, secret
    scanning, push protection, and vulnerability reporting.
7.  **Responsibilities:** confirm delivery ownership, backups, and
    review coverage.
8.  **Milestones and labels:** confirm the team's tracking conventions
    and configure them where agreed.
9.  **Evidence:** record the verification date, settings references,
    outcome, responsible maintainer, and any blocker in the designated
    coordination issue.

An earlier audit reported that branch-protection API reads returned HTTP
404. That result was inconclusive and should not be treated as
definitive proof that branch protection is absent. Maintainers should
inspect the repository settings directly.

## 8. Next delivery stage

With Sprint 0 closed, the next technical stage is **Sprint 1**, tracked
through issue #29, focused on contracts, errors, and the threat model.

The subsequent roadmap covers input validation and failure hardening,
end-to-end workflow and reconciliation, release-candidate readiness, a
controlled pilot, final hardening, and release decision activities.

Governance verification should continue as a parallel coordination
workstream. It should not be represented as completed until maintainers
have recorded evidence.

## 9. Reporting and evidence principles

To keep project reporting accurate:

-   Distinguish local test results from official CI results.
-   Record the commit, date, and scope associated with each verification
    run.
-   Distinguish a workflow that exists from a check that is enforced as
    a merge requirement.
-   Do not infer repository settings from inaccessible API responses
    alone.
-   Treat pull-request status as time-sensitive and verify it in the
    live repository.
-   Do not describe a fork push as a merge into the official repository.
-   Keep private-repository details and sensitive operational
    information in the appropriate private coordination location.

## 10. Overall status

**PortaD Delivery is actively being coordinated. Sprint 0 is completed
and closed. Baseline checks have been reported as passing, and a shared
delivery project is in use. Some project and repository governance
controls still require maintainer confirmation and documented
evidence.**

This public summary is intended to provide contributors with a clear
overview without exposing private operational details or overstating
what has been verified.

------------------------------------------------------------------------

*Document owner: PortaD delivery contributors*\
*Last updated: 11 November 2026*
