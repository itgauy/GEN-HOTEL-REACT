# React + Vite + Shadcn

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, here's the project installation:

```
npm install -g pnpm
```

```
pnpm install --no-frozen-lockfile
```

```
pnpm run dev
```

Here's how to add every components that exist in Shadcn (always use @2.1.8 in a while...)

```
pnpm dlx shadcn@2.1.8 add <component-name>
```
(For ex: `pnpm dlx shadcn@2.1.8 add button`)

```
pnpm dlx shadcn@2.1.8 init
```
(This one is optional since it's more on automated shadcn setup)

Reason: TailwindCSS version uses the 3.3.4 yet the v4 as of now has major bug issues.

# How to contribute?

Since this repository was made to public just made your own fork instead and then after you made any changes just issue your pull request (PR).