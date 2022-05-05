import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";

export function formatTimestamp(timestamp) {
  const date = fromUnixTime(timestamp);
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });
  return timeAgo;
}
