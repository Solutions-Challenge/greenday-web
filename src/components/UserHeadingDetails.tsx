import React, { useState } from 'react';
import { Avatar, Button, Text, useTheme } from '@geist-ui/react';
import Link from 'next/link';

interface Props {
  user: {
    name: string;
    avatarSrc: string | null;
    email: string;
    phone: string;
    address: string;
    timeAvailability: string;
    website: URL;
    recycledType: string;
  };
}

export type HeadingProps = Props;

const HeadingDetails: React.FC<HeadingProps> = ({ user }) => {
  const theme = useTheme();
  const [userInfoUpdate, setUserInfoUpdate] = useState<boolean>(false);

  if (user.avatarSrc === null) {
    user.avatarSrc = "/assets/images/userLogo.jpg";
  }

  const handleTriggerUpdate = () => {
    setUserInfoUpdate(true);
  };

  return (
    <>
      <div className="heading__wrapper">
        <div className="heading">
          <Avatar alt="Your Avatar" className="heading__user-avatar" src={user.avatarSrc} />
          <div className="heading__name">
            <div className="heading__title">
              <Text h2 className="heading__user-name">
                {user.name}
              </Text>
              
              <div className='heading__info'>
                <Text h5 className='heading__user-info'>
                  Email: {user.email}<br></br>
                  Phone: {user.phone}<br></br>
                  Address: {user.address}<br></br>
                  Time Availability: {user.timeAvailability}<br></br>
                  Website:{' '}
                    <Link href={user.website!} passHref={true}>
                      {user.website.toString()}
                    </Link><br></br>
                  Recycled Type: {user.recycledType}<br></br>
                </Text>
              </div>

              <div className="heading__actions">
                <Button type="secondary" auto onClick={handleTriggerUpdate}>
                  Update Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .heading__wrapper {
          border-bottom: 0px solid ${theme.palette.border};
        }
        .heading {
          display: flex;
          flex-direction: row;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.gap} * 2) ${theme.layout.pageMargin} calc(${theme.layout.gap} * 4);
          box-sizing: border-box;
        }
        .heading :global(.heading__user-avatar) {
          height: 100px;
          width: 100px;
          margin-right: ${theme.layout.gap};
        }
        .heading__title {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
        }
        .heading__name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }
        .heading__name :global(.heading__user-name) {
          line-height: 1;
        }
        .heading__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          margin-left: 20px;
        }
        .heading__info :global(.heading__user-info) {
          line-height: 1;
        }
        .heading__actions {
          margin-left: auto;
        }
        .heading__integration :global(.heading__integration-title) {
          color: ${theme.palette.accents_5} !important;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          margin: 0;
        }
        .heading__integration-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .heading__integration-inner :global(svg) {
          margin-right: ${theme.layout.gapQuarter};
        }
      `}</style>
    </>
  );
};

export default HeadingDetails;
