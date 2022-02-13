import React from 'react';
import { Avatar, Text, Card, useTheme, Image } from '@geist-ui/react';

interface Props {
  pictureURL: string;
  pictureName: string;
}

export type ProjectCardProps = Props;

const ProjectCard: React.FC<ProjectCardProps> = ({ pictureURL, pictureName }) => {
  const theme = useTheme();

  return (
    <>
      <div className="project__wrapper">
        <Card className="project__card" shadow>
          <Image src={pictureURL}></Image>
          <Text marginBottom={0} font="0.875rem" style={{ color: theme.palette.accents_5 }}>
            {pictureName}
          </Text>
        </Card>
      </div>
      <style jsx>{`
        .project__wrapper {
          width: 100%;
        }
        .project__wrapper :global(.project__card) {
          box-shadow: ${theme.type === 'dark' ? theme.expressiveness.shadowSmall : '0px 2px 4px rgba(0,0,0,0.1)'};
        }
        .project__wrapper :global(.project__card):hover {
          box-shadow: ${theme.type === 'dark'
            ? `0 0 0 1px ${theme.palette.foreground}`
            : '0px 4px 8px rgba(0,0,0,0.12)'};
        }
        .project-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .project-title__wrapper :global(.project-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === 'dark' ? `1px solid ${theme.palette.foreground}` : 'none'};
        }
        .project-git-commit,
        .project-git-commit-error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 3rem;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        .project-git-commit-error {
          padding: 0 ${theme.layout.unit};
          border-radius: ${theme.layout.radius};
          background: ${theme.palette.accents_1};
          border: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </>
  );
};

export default ProjectCard;
