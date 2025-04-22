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

Here's how to add every components that exist in Shadcn (we can now use latest now hurray)

```
pnpm dlx shadcn@latest add <component-name>
```
(For ex: `pnpm dlx shadcn@latest add button`)

```
pnpm dlx shadcn@latest init
```
(This one is optional since it's more on automated shadcn setup)

Reason: TailwindCSS version uses the 3.3.4 yet the v4 as of now has major bug issues.

# Third Party Plugins

This section just include some of the third-party not affiliated to Shadcn alone.

```
pnpm dlx shadcn@latest add <some links URl in https://originui.com/calendar-date-picker>
```

# How to contribute?

Since this repository was made to public just made your own fork instead and then after you made any changes just issue your pull request (PR).