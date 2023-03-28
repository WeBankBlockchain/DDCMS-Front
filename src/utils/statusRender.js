import { Badge } from "antd";

function renderStatusBadge(statusCode) {
  if (statusCode === 0) {
    return <Badge status="processing" text="审核中" />;
  } else if (statusCode === 1) {
    return <Badge status="success" text="审核通过" />;
  } else if (statusCode === 2) {
    return <Badge status="error" text="拒绝" />;
  }
}

export default renderStatusBadge;