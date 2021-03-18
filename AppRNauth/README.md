# React Native Example

## Requirements

- NodeJS version >= 8.0
- Xcode, if building for iOS

## Installation
```bash
$ npm i
```

## Setting up the React Native iOS environment
```bash
$ brew install watchman
```

Setting up iOS auth
```bash
$ cd ios ; pod install
```

Start iOS
```bash
$ cd .. ; npm run ios
```

## Setting up the React Native Android environment
```bash
$ brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

Add the following lines to our $HOME/.bash_profile or $HOME/.bashrc to configure the ANDROID_HOME environment variable. If you are using zsh, the files are ~/.zprofile or ~/.zshrc.
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```