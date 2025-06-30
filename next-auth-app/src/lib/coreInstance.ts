
import { Core } from '@walletconnect/core'
import { WalletKit } from '@reown/walletkit'

const core = new Core({
  projectId: '0cd943817e0311ef6bb4f6381d32e6fa'
})

const metadata = {
  name: 'nextauth',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const walletKit = await WalletKit.init({
  core, // <- pass the shared 'core' instance
  metadata
})