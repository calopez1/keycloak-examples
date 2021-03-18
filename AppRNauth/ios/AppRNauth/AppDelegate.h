// #import <React/RCTBridgeDelegate.h>
// #import <UIKit/UIKit.h>

// @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

// @property (nonatomic, strong) UIWindow *window;

// @end

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RNAppAuthAuthorizationFlowManager.h"

// @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, RNAppAuthAuthorizationFlowManager>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RNAppAuthAuthorizationFlowManager>


@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;
@end
// #import <React/RCTBridgeDelegate.h>
// #import <UIKit/UIKit.h>

//  @protocol OIDAuthorizationFlowSession;

//  @interface AppDelegate : UIResponder <UIApplicationDelegate>
// @property(nonatomic, strong, nullable) id<OIDAuthorizationFlowSession> currentAuthorizationFlow;
//  @property (nonatomic, strong) UIWindow *window;
//  @end