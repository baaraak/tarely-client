import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const GlobalErrorDialog = ({ handleClose, globalError }) => (
  <Modal
    visible={globalError !== null}
    closable={false}
    title="Oppss, It's seems that u"
    footer={[
      <Button key="submit" type="primary" onClick={handleClose}>
                Go back
      </Button>,
        ]}
  >
    <div>
      {globalError}
    </div>
  </Modal>
);

GlobalErrorDialog.propTypes = {
  handleClose: PropTypes.func,
  globalError: PropTypes.string,
};

GlobalErrorDialog.propTypes = {

};

export default GlobalErrorDialog;
