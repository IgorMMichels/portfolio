# shadcn UI Components

This directory is intended to host shadcn UI components. 

## Architecture

- Components are added individually as needed.
- Each component is a standalone file (e.g., `button.tsx`, `input.tsx`).
- Components are built using Tailwind CSS and Radix UI primitives.
- Styles are managed via Tailwind classes and CSS variables in `src/globals.css`.

## Usage

To add a new component, use the shadcn CLI or copy the component code into this directory.
Ensure that `src/lib/utils.ts` is present for class merging.
