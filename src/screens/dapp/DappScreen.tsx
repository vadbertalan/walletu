import {useSignTransactions} from '@multiversx/sdk-dapp/hooks/transactions/useSignTransactions';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {WebView} from 'react-native-webview';

import {DAPP_BASE_URL, WALLET_BASE_URL} from 'src/constants';
import {StackParamLists} from 'src/navigation/stack-param-lists';

// WIP

export const DappScreen: React.FC = () => {
  const {
    params: {account},
  } = useRoute<RouteProp<StackParamLists, 'Dapp'>>();

  const o = useSignTransactions();
  console.log('🚀 ~ o:', o);

  const webviewRef = useRef<WebView>(null);

  const handleWebViewNavigationStateChange = useCallback((newNavState: any) => {
    const {url} = newNavState;
    console.log('🚀 ~ handleWebViewNavigationStateChange ~ url:', url);

    if (url.includes(WALLET_BASE_URL)) {
      // TODO: stop redirecting

      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      webviewRef.current?.injectJavaScript(redirectTo);
    }
  }, []);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${DAPP_BASE_URL}/dashboard?address=${account.address}`,
      }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};
