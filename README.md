This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Check Analysis System

A modern web application for analyzing check images and integrating with SAP systems. This application provides a sleek, user-friendly interface for uploading, analyzing, and exporting check data.

![Check Analysis System](public/screenshot.png)

## Features

- **Modern UI/UX**: Built with Next.js, Tailwind CSS, Framer Motion, and Three.js
- **Multiple File Upload**: Drag and drop or select multiple check images (PNG, JPG, PDF)
- **Real-time Analysis**: Visual progress tracking during check analysis
- **SAP Integration**: Export analyzed check data directly to SAP systems
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **State Management**: React Hooks

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. **Upload Check Images**: Drag and drop check images or click "Select Files" to choose files from your device. Supported formats: PNG, JPG, PDF.
2. **Analyze Checks**: Click the "Analyze Checks" button to process the uploaded images. A progress bar will show the analysis status.
3. **View Results**: After analysis, results will be displayed showing the extracted data from each check.
4. **Export to SAP**: Click "Export to SAP" to send the analyzed data to your SAP system.

## API Integration

The application is designed to work with external APIs for check analysis and SAP integration. Currently, it uses mock services that simulate these APIs. To connect to real services:

1. Update the API endpoints in `src/services/api.ts`
2. Configure authentication as required by your API providers
3. Adjust the data mapping to match your API's response format

## Customization

- **Theme**: Modify colors and styling in `tailwind.config.js` and `src/app/globals.css`
- **3D Background**: Customize the 3D elements in `src/components/Background3D.tsx`
- **File Types**: Adjust accepted file types in `src/components/FileUploader.tsx`

## License

[MIT](LICENSE)
