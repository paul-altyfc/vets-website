import React, { useEffect } from 'react';
import { WIZARD_STATUS, WIZARD_STATUS_COMPLETE } from '../../constants';

const ApplyLaterNotification = () => {
  useEffect(() => {
    sessionStorage.setItem(WIZARD_STATUS, WIZARD_STATUS_COMPLETE);
  });

  return (
    <div className="vads-u-margin-top--2 vads-u-padding--3 vads-u-background-color--primary-alt-lightest">
      <p className="vads-u-margin--0">
        You can apply for career planning and guidance benefits when you’re
        ready. Come back to this page to begin your application.
      </p>
    </div>
  );
};

export default {
  name: 'applyLaterNotification',
  component: ApplyLaterNotification,
};
