<!-- Thanks for submitting a pull request! Please provide enough information so  others can review your pull request. -->

## Pull Request Checklist

- [ ] I have read the CONTRIBUTING document.

## Commit Message Structure

Please structure your commit message as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Pull Request Type

Please select the appropriate type for this pull request:

- **fix**: a commit of the type fix patches a bug in the codebase.
- **feat**: a commit of the type feat introduces a new feature to the codebase.
- **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change or other significant change. A BREAKING CHANGE can be part of commits of any type.
- Other types: other types such as build, chore, ci, docs, style, refactor, perf, and test are allowed and may be more appropriate for certain changes.
  Example

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

- Other footers besides "BREAKING CHANGE: <description>" may be provided.
  **For more information, please link to an open issue.**
