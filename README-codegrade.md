# Codegrade

## Setup

### Uploaded fixtures

These files must be re-uploaded to Codegrade whenever we make changes to them:

- `project.test.js`
- `jest.config.js`

### Global setup script to run

```bash
cg-jest install
```

### Per-student setup script to run

```bash
mv $FIXTURES/* . && npm install
```

### Programs to test

#### Checking student code to grade compliance with project specifications

```bash
cg-jest run -- project.test.js --runInBand --forceExit
```
