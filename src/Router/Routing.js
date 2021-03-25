import React, { Suspense, Component, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Loading from "../Components/Loading";
import BaseLayout from "../Components/BaseLayout";

const Beranda = lazy(() => import("../Components/Main/Beranda"));
const PersonnelList = lazy(() => import("../Components/Main/PersonnelList"));
const DailyAttendance = lazy(() =>
  import("../Components/Main/DailyAttendance")
);

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <BaseLayout>
            <Switch>
              <Route exact path="/beranda" component={() => <Beranda />} />
              <Route
                path="/personel"
                component={() => <PersonnelList />}
              />
              <Route
                exact
                path="/daily"
                component={() => <DailyAttendance />}
              />
              <Redirect to="/personel" />
            </Switch>
          </BaseLayout>
        </Suspense>
      </Router>
    );
  }
}

export default Routing;
