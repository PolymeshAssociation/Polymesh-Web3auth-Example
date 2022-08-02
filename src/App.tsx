import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./polymeshRPC";
import "./App.css";

const clientId = "CLIENT_ID"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [consoleMessage, setConsoleMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {

      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.OTHER,
          displayName: "Polymesh Staging",
          ticker: "POLYX"
        },
      });

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          clientId,
          network: "testnet",
          uxMode: "popup",
        },
      });
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);

      await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    console.log("Logging in and setting provider");
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
    setConsoleMessage(JSON.stringify(user));
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const onGetPolymeshPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const polymeshKey = await rpc.getPolymeshPrivateKey();
    console.log(polymeshKey);
    setConsoleMessage(JSON.stringify(polymeshKey));

  };

  const getIdentity = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const identity = await rpc.getIdentity();
    console.log(identity);
    setConsoleMessage(JSON.stringify(identity));

  };

  const getKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userKey = await rpc.getKey();
    console.log(userKey);    
    setConsoleMessage(JSON.stringify(userKey!.address));

  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
    setConsoleMessage(JSON.stringify(balance));

  };

  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={onGetPolymeshPrivateKey} className="card">
        Get Polymesh Private Key
      </button>
      <button onClick={getKey} className="card">
        Get Signing Key
      </button>
      <button onClick={getIdentity} className="card">
        Get Signing Identity
      </button>
      <button onClick={getBalance} className="card">
        Get Signing Key Balance
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }} ></p>
        <input value={consoleMessage}  />
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://polymesh.network/" rel="noreferrer">
          Polymesh: 
        </a>
        Web3Auth & ReactJS Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

    </div>
  );
}

export default App;