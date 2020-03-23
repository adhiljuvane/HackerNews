import React, { useEffect, useState } from "react";
import { getStory } from "../services/hnApi";
import { StoryWrapper , StoryTitle , StoryMeta , StoryMetaElement} from '../styles/StoryStyles';

export const Story = ({ storyId }) => {
  const [story, setStory] = useState({});
  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
  }, []);
  return story && story.url ? (
    <StoryWrapper data-testid="story">
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>

      <StoryMeta>
        <span data-testid="story-by">
          <StoryMetaElement color="#000">
            By : <StoryMetaElement>{story.by}</StoryMetaElement>
          </StoryMetaElement>
        </span>

        <span data-testid="story-time">
          <StoryMetaElement color="#000">
          Posted : <StoryMetaElement>{story.time}</StoryMetaElement>
          </StoryMetaElement>
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
};
