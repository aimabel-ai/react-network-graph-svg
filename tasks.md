# Tasks: Build and Publish `react-network-graph-svg`

Here is a granular, step-by-step plan in Markdown format, saved as /tasks.md, designed for LLM-driven development with testable units:

⸻


# Tasks: Build and Publish `react-network-graph-svg`

## Goal
Extract, clean up, and publish a reusable React component that renders a network graph as SVG.

---

## 🧱 Setup & Scaffolding

### 1. Initialize a new npm package
**Start:** You are in the project root.  
**End:** A `package.json` is created and ready to edit.

```bash
npm init --scope=@aimabel
```

⸻

2. Install development dependencies

Start: You have a package.json.
End: The following packages are installed as dev dependencies:
	•	typescript
	•	react, react-dom
	•	@types/react, @types/react-dom

npm install --save-dev typescript react react-dom @types/react @types/react-dom


⸻

3. Create a minimal tsconfig.json

Start: No tsconfig.json exists.
End: A valid tsconfig.json is created with support for src/.

⸻

4. Create an entry file src/index.ts

Start: Only src/NetworkGraphSVG.tsx exists.
End: A new file src/index.ts is created that exports NetworkGraphSVG.

	export { default as NetworkGraphSVG } from './NetworkGraphSVG';


⸻

🔧 Component Refactor

5. Convert NetworkGraphSVG.tsx to accept nodes, edges, width, and height as props

Start: These values may be hardcoded or not fully exposed.
End: Component accepts all graph data and layout via props.

⸻

6. Define Node and Edge types

Start: No clear external typing for the props.
End: Exported Node and Edge TypeScript types or interfaces.

⸻

7. Add basic runtime prop validation (optional with PropTypes or zod)

Start: Component may assume prop shape.
End: Validation is added or declared unnecessary.

⸻

8. Ensure all inline styles or classNames are self-contained

Start: The component may rely on global CSS or app-specific Tailwind.
End: Styling is fully embedded or declared as external dependency.

⸻

9. Add default values for optional props

Start: All props are required.
End: width, height, etc. have defaults defined using defaultProps or destructuring.

⸻

📦 Build & Package

10. Add a simple build script using tsc

Start: No build process is defined.
End: tsconfig.build.json is created and npm run build compiles the project.

⸻

11. Add main and types fields to package.json

Start: package.json lacks output fields.
End: These fields point to your build output, e.g.:

"main": "dist/index.js",
"types": "dist/index.d.ts",


⸻

12. Add files and exports to package.json

Start: The whole repo may be published.
End: src/ and dist/ are whitelisted for publish.

⸻

📄 Documentation

13. Create a basic README.md

Start: No README.
End: Includes:
	•	What the component does
	•	Installation
	•	Example usage
	•	Props table

⸻

14. Add LICENSE (MIT)

Start: No license file exists.
End: An MIT license is added to the root of the repo.

⸻

🚀 Publish

15. Create .npmignore or use files field

Start: Everything is publishable.
End: Only necessary files are included in the published package.

⸻

16. Login to npm and publish the package

Start: Package is unpublished.
End: First public version is live on npm.

npm login
npm publish --access public


⸻

17. Tag and push to GitHub

Start: Repo is local only.
End: All code is committed and pushed to GitHub.

git init
git remote add origin git@github.com:aimabel-ai/react-network-graph-svg.git
git push -u origin main


⸻

18. Create an /example folder for manual testing

Start: No way to test the component in isolation.
End: Example app exists that renders a small graph.

⸻

19. Add a deployable Vite app for live preview (optional)

Start: Only local usage.
End: /example is viewable via npm run dev and deployable via Vercel or similar.
