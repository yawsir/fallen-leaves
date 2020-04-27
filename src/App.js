import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from '@views/Home'
function App() {
  return (
    <HashRouter>
        <Switch>
            <Route path="/">
              <Home></Home>
            </Route>
        </Switch>
    </HashRouter>
  );
}

export default App;
