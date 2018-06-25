#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#import <CoreBluetooth/CoreBluetooth.h>
#import <WalkbaseEngageSDK/WalkbaseEngageSDK.h>


@interface WalkbaseEngageManager : RCTEventEmitter <RCTBridgeModule, WBEngageManagerDelegate>{
}

@end
