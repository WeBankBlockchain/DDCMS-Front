import { Progress, Tooltip } from "antd";

export default function renderVoteProgress(record) {
  const total = record.witnessCount;
  const voted = record.denyCount + record.agreeCount;
  const per = (voted / total) * 100;
  const suc = (record.agreeCount / total) * 100;
  return (
    <Tooltip
      title={`${record.agreeCount} agree / ${record.denyCount} deny / ${record.witnessCount} total`}
    >
      <Progress
        percent={per.toFixed(1)}
        success={{
          percent: suc,
        }}
      />
    </Tooltip>
  );
}
