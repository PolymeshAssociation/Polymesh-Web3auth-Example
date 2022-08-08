"use strict";(self.webpackChunkpolymesh_web3auth_example=self.webpackChunkpolymesh_web3auth_example||[]).push([[389],{80226:t=>{t.exports=function(){let{mustBeMetaMask:t=!1,silent:e=!1,timeout:i=3e3}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n();let a=!1;return new Promise((n=>{function r(){if(a)return;a=!0,window.removeEventListener("ethereum#initialized",r);const{ethereum:i}=window;if(!i||t&&!i.isMetaMask){const a=t&&i?"Non-MetaMask window.ethereum detected.":"Unable to detect window.ethereum.";!e&&console.error("@metamask/detect-provider:",a),n(null)}else n(i)}window.ethereum?r():(window.addEventListener("ethereum#initialized",r,{once:!0}),setTimeout((()=>{r()}),i))}));function n(){if("boolean"!==typeof t)throw new Error("@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.");if("boolean"!==typeof e)throw new Error("@metamask/detect-provider: Expected option 'silent' to be a boolean.");if("number"!==typeof i)throw new Error("@metamask/detect-provider: Expected option 'timeout' to be a number.")}}},12389:(t,e,i)=>{i.r(e),i.d(e,{MetamaskAdapter:()=>o});var a=i(4942),n=i(80226),r=i.n(n),s=i(37949);class o extends s.J5{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};super(),(0,a.Z)(this,"adapterNamespace",s.yk.EIP155),(0,a.Z)(this,"currentChainNamespace",s.EN.EIP155),(0,a.Z)(this,"type",s.hN.EXTERNAL),(0,a.Z)(this,"name",s.rW.METAMASK),(0,a.Z)(this,"status",s.MP.NOT_READY),(0,a.Z)(this,"rehydrated",!1),(0,a.Z)(this,"metamaskProvider",null),this.chainConfig=t.chainConfig||null}get provider(){return this.status===s.MP.CONNECTED&&this.metamaskProvider?this.metamaskProvider:null}set provider(t){throw new Error("Not implemented")}async init(t){if(super.checkInitializationRequirements(),this.metamaskProvider=await r()({mustBeMetaMask:!0}),!this.metamaskProvider)throw s.Ty.notInstalled("Metamask extension is not installed");this.status=s.MP.READY,this.emit(s.n2.READY,s.rW.METAMASK);try{s.cM.debug("initializing metamask adapter"),t.autoConnect&&(this.rehydrated=!0,await this.connect())}catch(e){this.emit(s.n2.ERRORED,e)}}setAdapterSettings(t){}async connect(){if(super.checkConnectionRequirements(),this.chainConfig||(this.chainConfig=(0,s.h2)(s.EN.EIP155,1)),this.status=s.MP.CONNECTING,this.emit(s.n2.CONNECTING,{adapter:s.rW.METAMASK}),!this.metamaskProvider)throw s.RM.notConnectedError("Not able to connect with metamask");try{await this.metamaskProvider.request({method:"eth_requestAccounts"});const{chainId:t}=this.metamaskProvider;if(t!==this.chainConfig.chainId&&await this.switchChain(this.chainConfig),this.status=s.MP.CONNECTED,!this.provider)throw s.RM.notConnectedError("Failed to connect with provider");return this.provider.once("disconnect",(()=>{this.disconnect()})),this.emit(s.n2.CONNECTED,{adapter:s.rW.METAMASK,reconnected:this.rehydrated}),this.provider}catch(t){throw this.status=s.MP.READY,this.rehydrated=!1,this.emit(s.n2.ERRORED,t),s.RM.connectionError("Failed to login with metamask wallet")}}async disconnect(){var t;let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};if(this.status!==s.MP.CONNECTED)throw s.RM.disconnectionError("Not connected with wallet");null===(t=this.provider)||void 0===t||t.removeAllListeners(),e.cleanup?(this.status=s.MP.NOT_READY,this.metamaskProvider=null):this.status=s.MP.READY,this.rehydrated=!1,this.emit(s.n2.DISCONNECTED)}async getUserInfo(){if(this.status!==s.MP.CONNECTED)throw s.RM.notConnectedError("Not connected with wallet, Please login/connect first");return{}}async switchChain(t){if(!this.metamaskProvider)throw s.RM.notConnectedError("Not connected with wallet");try{await this.metamaskProvider.request({method:"wallet_switchEthereumChain",params:[{chainId:t.chainId}]})}catch(e){if(4902!==e.code)throw e;await this.metamaskProvider.request({method:"wallet_addEthereumChain",params:[{chainId:t.chainId,chainName:t.displayName,rpcUrls:[t.rpcTarget]}]})}}}}}]);
//# sourceMappingURL=389.9e18aaa3.chunk.js.map