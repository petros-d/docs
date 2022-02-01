---
sidebar_label: "astrocloud completion"
title: "astrocloud completion"
id: astrocloud-completion
description: Reference documentation for astrocloud completion.
---

## Description

Generate completion scripts for Astronomer Cloud commands. You can modify the generated scripts and add them to the appropriate directory to customize your command line autocompletion behavior.

## Usage

```sh
astrocloud completion <shell>
```

## Options

| Option  | Description                                          | Possible Values                   |
| ------- | ---------------------------------------------------- | --------------------------------- |
| `<shell>` | The type of shell to generate completion scripts for | `bash`,`fish`, `powershell`,`zsh` |

## Example

To generate a shell completion script for zsh, for example, you can run:

```sh
$ astrocloud completion zsh > /usr/local/share/zsh/site-functions/_astrocloud
# Completion script saved in your local directory
```

Then, to enable autocompletion, ensure that the following lines are present in your `~/.zshrc` file:

```sh
autoload -U compinit
compinit -i
```
