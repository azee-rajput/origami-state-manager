# Contributing to Oopsies State Manager

If you're reading this, you're **OSM!** (awesome!) Thank you for being a part of the community and helping us make this project great. Your contributions and support are invaluable, and we appreciate everything you do to help us grow and improve. Keep being amazing!

Here are a few guidelines that will help you along the way.

1. [Opening an issue](#opening-an-issue)
2. [Contributing to the code](#contributing-to-the-code)
3. 1. [Branch naming](#branch-naming)
4. 2. [Opening a pull request](#opening-a-pull-request)

## Opening an issue

Would you like to request a new feature or an update to the documentation? Or have you encountered an **Oopsie** (a bug)? If so, please create an issue.

Issues are often a starting point for communication and provide an opportunity for interaction between maintainers and contributors. Typically, each issue focuses on a single main idea, accompanied by an explanation. For example, a bug report would address one specific bug, while a feature request would outline a single feature. This approach ensures clarity and helps streamline discussions and solutions.

We have templates available for code refactoring, documentation improvements, bug reports, and feature requests. If there are templates, it’s important to use them for opening an issue rather than start with a blank issue. You can also add labels to the issues for better clarity and segregation.

## Contributing to the code

As OSM is open source and community driven, pull requests are always welcome, but before working on a PR, here are few guidelines for branch naming and sending a pull request.

### Branch naming

I researched trunk-based development and wrote a guideline for myself.

1. **Branch Naming and Structure**:

   - The `main` branch represents the latest stable codebase.
   - The `develop` branch is the latest work in progress code. All the branches are taken out from this branch and merged back to it.
   - Branch names need a prefix to show their intention (e.g., `feat/`). Use the same prefixes as with Git commits: `docs`, `feat`, `fix`, or `refactor`. There is no need for other prefixes.
   - Add the IDs of the Github issues to the branch name wherever possible. Doing this means one Github issue represents one feature. If there is no issue opened for it then create the issue first.
   - Example: `docs/contributing_doc-issue_1`

2. **Release Branches**:

   - When approaching a release, create a dedicated release branch for bug fixes, documentation generation, and fine-tuning from `develop` branch.
   - The release branch should include the version in its name (e.g., `release/v0.1.1` or for non-production releases `release/v0.1.1-SNAPSHOT`).
   - Create the release tag from this branch. Before tagging the release, merge all changes from the release branch into `main`. Additionally, some cherry-picked commits can be merged into the release branch.

3. **Merge Policy**:
   - Every merge into `main` means the feature must be production-ready!

### Opening a pull request

When in doubt, keep your pull requests small. For the best chance of being accepted, avoid bundling more than one feature or bug fix per PR. It's often better to create two smaller PRs rather than one large one.

Once a PR is raised, navigate to the issue it addresses and link the PR in the development section of the issue.
