import { Stack } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

export default function Layout({ children }) {
  return (
    <Stack gap={3}>
      <div className="p-2">
        <NavigationBar />
      </div>
      <div className="p2">{children}</div>
    </Stack>
  );
}
