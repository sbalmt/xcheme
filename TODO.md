# XCHEME Todo

- **Library**

  - Add support for getting all the next possible tokens.

- **Language**

  - Allow maps to be used with node directives without referencing entries when they aren't dynamic.

- **Runtime**

  - Add infinite loop/recursion detection.

- **Output**

  - Optimize loose tokens for using map patterns.
  - Optimize map entry identities for aliased and non-aliased tokens/nodes.
  - Reference order swap for avoiding single references in the output.
  - Add headers when printing symbol and token in the CLI output.
  - Improve node tree printing in the CLI output.

- **Extension**

  - Add errors/warnings for ambiguous syntax.
  - Add support for auto completing .xcm files in the current workspace.
  - Add different icons for tokens/nodes in the auto completion tool.
