# Astronomer Cloud Documentation

This repository contains all of the documentation for Astronomer Cloud. Documentation for other Astronomer product offerings is stored in the [`docs` repo](https://github.com/astronomer/docs).

## Suggest a Change 

Thank you for making a suggestion to our docs! Suggestions contributed in the form of GitHub issues are triaged and handled by the Astronomer team. 

To make a suggestion, create a new issue in this repo. Please use the appropriate issue template and fill out all relevant template fields when submitting an issue. 

## Contribute

To contribute to Cloud docs, fork this repo and create a branch off of `main`. You can do this either directly in the GitHub repository or by clicking the "Edit this page" button on any published document.

Once you have submitted a PR for your changes, Netlify will add a coment to your PR that includes a link to a staging website with your changes. 

Small edits and typo fixes don't need to be linked to an issue and should be mergerd quickly. To get timely review on a larger contribution, we recommend first creating a detailed GitHub issue describing the problem and linking that within your PR. 

Every update to the main branch of this repository will trigger a rebuild of our production website at https://www.cloud-docs.astronomer.io. It might take a few moments for your merged changes to appear live on the website. 

### Build Locally with Docusaurus  

For larger contributions, such as new documents or screenshots, you likely need to interact with [Docusaurus](https://docusaurus.io/), which is our static site generator. Read the following sections for instructions on how to build and test your documentation changes locally. 

#### Installation

Please read the [Docusaurus documentation](https://docusaurus.io/docs/installation#requirements) for information on installing the tools you'll need to work with Docusaurus locally. 

#### Local Development

To serve a local version of the Astronomer Cloud docs site with your changes, run:

```console
yarn start
```

This command both builds and serves your local changes. By default, your local build is accessible at `localhost:3000`. From here, any changes you save in your text editor will render on this local site in real time.
