import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Favicon sizes and formats needed
const faviconSizes = [
  { size: 16, name: "favicon-16x16.png", darkName: "favicon-16x16-dark.png" },
  { size: 32, name: "favicon-32x32.png", darkName: "favicon-32x32-dark.png" },
  { size: 180, name: "apple-touch-icon.png", darkName: "apple-touch-icon-dark.png" },
  { size: 192, name: "android-chrome-192x192.png", darkName: "android-chrome-192x192-dark.png" },
  { size: 512, name: "android-chrome-512x512.png", darkName: "android-chrome-512x512-dark.png" },
];

async function generateFavicons() {
    console.log("🎨 Generating favicons from SVG logos...");

  try {
    // Read the SVG logos
    const lightLogoSvgPath = path.join(__dirname, "../public/logo.svg");
    const darkLogoSvgPath = path.join(__dirname, "../public/logo-dark.svg");
    
    const lightLogoSvgBuffer = fs.readFileSync(lightLogoSvgPath);
    const darkLogoSvgBuffer = fs.readFileSync(darkLogoSvgPath);

    // Generate all favicon sizes for both light and dark modes
    for (const { size, name, darkName } of faviconSizes) {
      const lightOutputPath = path.join(__dirname, "../public", name);
      const darkOutputPath = path.join(__dirname, "../public", darkName);

      // Generate light mode favicon
      await sharp(lightLogoSvgBuffer)
        .resize(size, size)
        .png()
        .toFile(lightOutputPath);

      console.log(`✅ Generated ${name} (${size}x${size})`);

      // Generate dark mode favicon
      await sharp(darkLogoSvgBuffer)
        .resize(size, size)
        .png()
        .toFile(darkOutputPath);

      console.log(`✅ Generated ${darkName} (${size}x${size})`);
    }

    // Generate ICO file (using light mode logo)
    const icoPath = path.join(__dirname, "../public/favicon.ico");
    await sharp(lightLogoSvgBuffer)
      .resize(32, 32)
      .png()
      .toFile(icoPath.replace(".ico", "-temp.png"));

    // For ICO, we'll use the 32x32 PNG (Sharp doesn't support ICO output directly)
    // Copy the 32x32 PNG as favicon.ico
    fs.copyFileSync(
      path.join(__dirname, "../public/favicon-32x32.png"),
      icoPath
    );

    // Clean up temp file
    const tempFile = icoPath.replace(".ico", "-temp.png");
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }

    console.log("✅ Generated favicon.ico");

    // Generate logo.png and logo-dark.png from SVG sources
    const logoPngPath = path.join(__dirname, "../public/logo.png");
    const logoDarkPngPath = path.join(__dirname, "../public/logo-dark.png");
    
    // Generate logo.png (light mode) - using a reasonable size for general use
    await sharp(lightLogoSvgBuffer)
      .resize(512, 512) // High resolution for general use
      .png()
      .toFile(logoPngPath);
    
    console.log("✅ Generated logo.png (light mode)");
    
    // Generate logo-dark.png (dark mode)
    await sharp(darkLogoSvgBuffer)
      .resize(512, 512) // High resolution for general use
      .png()
      .toFile(logoDarkPngPath);
    
    console.log("✅ Generated logo-dark.png (dark mode)");

    // Generate site.webmanifest
    const manifest = {
      name: "YTPN",
      short_name: "YTPN",
      description: "YTPN is a technology service provider offering software engineering, data science and support services.",
      start_url: "/",
      display: "standalone",
      theme_color: "#2563eb",
      background_color: "#2563eb",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-192x192-dark.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any dark",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512-dark.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any dark",
        },
      ],
    };

    fs.writeFileSync(
      path.join(__dirname, "../public/site.webmanifest"),
      JSON.stringify(manifest, null, 2)
    );

    console.log("✅ Generated site.webmanifest");

    // Copy the logo to public as icon.png for modern browsers
    // fs.copyFileSync(logoPath, path.join(__dirname, "../public/icon.png"));
    // console.log("✅ Generated icon.png");

    // Move favicon.ico to app directory for Next.js 13+ app router
    // const appFaviconPath = path.join(__dirname, "../src/app/favicon.ico");
    // fs.copyFileSync(icoPath, appFaviconPath);
    // console.log("✅ Moved favicon.ico to app directory");

    console.log("\n🎉 All favicons and logos generated successfully!");
    console.log("\nFiles created:");
    console.log("- favicon.ico (light mode)");
    console.log("- favicon-16x16.png (light mode)");
    console.log("- favicon-16x16-dark.png (dark mode)");
    console.log("- favicon-32x32.png (light mode)");
    console.log("- favicon-32x32-dark.png (dark mode)");
    console.log("- apple-touch-icon.png (light mode)");
    console.log("- apple-touch-icon-dark.png (dark mode)");
    console.log("- android-chrome-192x192.png (light mode)");
    console.log("- android-chrome-192x192-dark.png (dark mode)");
    console.log("- android-chrome-512x512.png (light mode)");
    console.log("- android-chrome-512x512-dark.png (dark mode)");
    console.log("- logo.png (light mode, 512x512)");
    console.log("- logo-dark.png (dark mode, 512x512)");
    console.log("- site.webmanifest (with dark mode support)");
  } catch (error) {
    console.error("❌ Error generating favicons:", error);
    process.exit(1);
  }
}

// Run the script
generateFavicons();
