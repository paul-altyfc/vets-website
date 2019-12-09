import React from 'react';
import { connect } from 'react-redux';

import backendServices from 'platform/user/profile/constants/backendServices';
import DowntimeNotification, {
  externalServices,
} from 'platform/monitoring/DowntimeNotification';
import { fetchRatedDisabilities, fetchTotalDisabilityRating } from '../actions';
import RequiredLoginView from 'platform/user/authorization/components/RequiredLoginView';
import RatedDisabilityView from '../components/RatedDisabilityView';

class RatedDisabilitiesApp extends React.Component {
  render() {
    const { ratedDisabilities } = this.props.ratedDisabilities;
    return (
      <>
        <RequiredLoginView
          authRequired={1}
          serviceRequired={backendServices.USER_PROFILE}
          user={this.props.user}
          loginUrl={this.props.loginUrl}
          verifyUrl={this.props.verifyUrl}
        >
          <DowntimeNotification
            appTitle="Rated Disabilities"
            dependencies={[externalServices.evss]}
          >
            <RatedDisabilityView
              fetchRatedDisabilities={this.props.fetchRatedDisabilities}
              ratedDisabilities={ratedDisabilities}
              user={this.props.user}
              fetchTotalDisabilityRating={this.props.fetchTotalDisabilityRating}
              totalDisabilityRating={this.props.totalDisabilityRating}
              loading={this.props.loading}
              error={this.props.error}
            />
          </DowntimeNotification>
        </RequiredLoginView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ratedDisabilities: state.ratedDisabilities,
  loading: state.totalRating.loading,
  error: state.totalRating.error,
  totalDisabilityRating: state.totalRating.totalDisabilityRating,
});

const mapDispatchToProps = {
  fetchRatedDisabilities,
  fetchTotalDisabilityRating,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatedDisabilitiesApp);
export { RatedDisabilitiesApp };
