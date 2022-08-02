//@ts-ignore
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymathnetwork/local-signing-manager';
import { SafeEventEmitterProvider } from "@web3auth/base";

let api: Polymesh;

export default class polymeshRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  getPolymeshPrivateKey = async (): Promise<any> => {
    try {
      const privateKey = (await this.provider.request({ method: "private_key" })) as string;
      return privateKey;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  setProvider = async () => {
    console.log("Setting provider...");
    const privateKey = await this.getPolymeshPrivateKey();
    const localSigningManager = await LocalSigningManager.create({
      accounts: [{ seed: privateKey || '' }],
    });
  
    if (!api) {
      api = await Polymesh.connect({
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        nodeUrl: 'wss://staging-rpc.polymesh.live',
        // middleware: {
        //   link: process.env.MIDDLEWARE_LINK!,
        //   key: process.env.MIDDLEWARE_KEY!,
          /* eslint-enable @typescript-eslint/no-non-null-assertion */
        // },
        signingManager: localSigningManager,
      });
    }
  
  };

  getKey = async () => {
    try {
      await this.setProvider();
      const key = (api.accountManagement.getSigningAccount());
      if (key == null) throw "No key found";
      console.log(`Connected! Signing Key: ${key.address}`);
      return key;
    } catch (error) {
      console.error("Error", error);
    }
  };

  getIdentity = async () => {
    try {
      await this.setProvider();
      const identity = (await api.getSigningIdentity());
      if (identity == null) throw "No identity found";
      console.log(`Connected! Signing Identity: ${identity.did}`);
      return identity.did;
    } catch (error) {
      console.error("Error", error);
    }
  };

  getBalance = async () => {
    try {
      await this.setProvider();
      const key = (await this.getKey())!;
      const balance = key!.getBalance();
      return balance;
    } catch (error) {
      return error;
    }
  };

}