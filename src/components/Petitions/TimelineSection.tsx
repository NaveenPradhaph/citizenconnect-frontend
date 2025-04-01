// TimelineSection.tsx
import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';

const date_readable = (timestamp:string) =>{

  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    dateStyle: "long", // e.g., March 27, 2025
    timeStyle: "medium", // e.g., 1:27:44 PM
    timeZone: "UTC", // Adjust to your desired timezone if needed
  });

};




interface TimelineEvent {
  createdAt: string;
  eventType: string;
  description: string;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ events }) => {
  return (
    <Timeline
    sx={{
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.2,
      },
    }}
    >
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="textSecondary">
            {date_readable(event.createdAt)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{event.eventType}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineSection;
