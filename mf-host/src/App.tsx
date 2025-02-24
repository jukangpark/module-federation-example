// import { ModuleLoader } from './DynamicRemoteLoader';

import { Suspense, lazy } from 'react';
import { getVersion, getId } from 'shared-deps-mf-package';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load remote components
const MfRemote1 = lazy(() => import('remote1/App'));
const MfRemote2 = lazy(() => import('remote2/App'));

function App() {
  return (
    <div>
      <h1>Host!!</h1>
      <p>Host의 공유 패키지 버전 {getVersion()}</p>
      <p>Host의 공유 패키지 Id {getId()}</p>

      <div>
        <h2>Remote 1</h2>
        <ErrorBoundary
          fallback={<div>Remote 1 로드 중 오류가 발생했습니다.</div>}
        >
          <Suspense fallback={<div>Loading Remote 1...</div>}>
            <MfRemote1 />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2>Remote 2</h2>
        <ErrorBoundary
          fallback={<div>Remote 2 로드 중 오류가 발생했습니다.</div>}
        >
          <Suspense fallback={<div>Loading Remote 2...</div>}>
            <MfRemote2 />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
