import * as templates from "./templates";

// Email renderer
export default async function renderEmail<K extends keyof typeof templates>(
  template: K,
  props: React.ComponentProps<(typeof templates)[K]>
) {
  const Component = templates[template];
  const ReactDOMServer = (await import("react-dom/server")).default;
  return (
    ReactDOMServer.renderToStaticMarkup(Component(props))
      .replace(/<script><\/script>/g, "")
      .replace(
        "<html>",
        `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">`
      )
  );
}

