# Astronomer Cloud Documentation

This repository contains all of the code and content that powers Astronomer Cloud and Enterprise [documentation](http://docs.astronomer.io).

## Suggest a Change

If you notice something in our documentation that is wrong, misleading, or could use additional context, the easiest way to make an impact is to create a GitHub issue in this repository. To do so,

1. Go to [Issues](https://github.com/astronomer/docs/issues)
2. Select **New Issue**
3. Depending on the change you have in mind, select a GitHub issue template.
4. Tell us what you think we can do better by answering the questions in the template.

GitHub issues are triaged by the Astronomer team and addressed promptly. Once you create a GitHub issue, our team may follow up with you with additional questions or comments. Once our team has addressed it, you'll get a notification via GitHub that the issue has been closed and that a change is now live.

## Contribute

If you'd like to contribute to Astronomer Docs directly, you are welcome to create a Pull Request (PR) to this repository with your suggested changes. To do so:

1. Fork this repository
2. Create a branch off of `main`
3. Make your changes in that branch.
4. Submit a PR for review.

Once you have submitted a PR for your changes, Netlify will add a comment to your PR that includes a link to a staging website with your changes.

Small edits and typo fixes don't need to be linked to an issue and should be merged quickly. To get a timely review on a larger contribution, we recommend first creating a detailed GitHub issue describing the problem and linking that within your PR.

Every update to the `main` branch of this repository will trigger a rebuild of our production documentation page at https://www.docs.astronomer.io. It might take a few moments for your merged changes to appear.

### Docs Structure 

There are two core documentation folders: `cloud` and `enterprise`. These folders contain the primary Astronomer docsets that you see by default on Astronomer's documentation site. More specifically, `enterprise `is equivalent **Latest** version of the Astronomer Enterprise docset, which is the docset that users see by default when accesssing `docs.astronomer.io/enterprise`.

![Screen Shot 2022-01-04 at 11 22 19 AM](https://user-images.githubusercontent.com/74574233/148051957-b739ba42-2fc7-4344-b0a0-4f78881fd68c.png)

An additional `enterprise_versioned_docs` folder contains docsets for previous versions of Enterprise. Whenever there's a new release of Astronomer Enterprise, a new versioned docset is copied from `enterprise` and added to this folder, with all links and sidebars updated automatically by Docusuaurs.

If you're working on a change in Enterprise docs, you should work primarily in `enterprise`. Make changes to `enterprise_versioned_docs` only if your change is version-specific or a critical fix (e.g. incorrect/ out-of-date information).

### Build Astronomer Docs Locally

If you want to submit a screenshot, GIF, or a new documentation file, we recommend building and testing your documentation change locally. Astronomer Cloud docs are built with [Docusaurus](https://docusaurus.io/), which is our static site generator. Read the following sections for instructions on how to build and test your documentation changes locally with Docusaurus.

#### Installation

Please read the [Docusaurus documentation](https://docusaurus.io/docs/installation#requirements) for information on installing the tools you'll need to work with Docusaurus locally.

#### Local Development

To serve a local version of the Astronomer Cloud docs site with your changes, run:

```console
yarn start
```

This command both builds and serves your local changes. By default, your local build is accessible at `localhost:3000`. From here, any changes you save in your text editor will render on this local site in real time.
