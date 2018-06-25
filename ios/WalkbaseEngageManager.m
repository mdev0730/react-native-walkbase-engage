#import "WalkbaseEngageManager.h"
#import "React/RCTBridge.h"
#import "React/RCTConvert.h"
#import "React/RCTEventDispatcher.h"
#import <WalkbaseEngageSDK/WalkbaseEngageSDK.h>

@implementation WalkbaseEngageManager

RCT_EXPORT_MODULE();

bool hasListeners;

- (instancetype)init
{
    
    if (self = [super init]) {
        [WBEngageManager sharedInstance].delegate = self;
        hasListeners = YES;
    }
    
    return self;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"WBEngageManagerStateNotDetermined", @"WBEngageManagerStateInitializing", @"WBEngageManagerStatePaused", @"WBEngageManagerStateScanning", @"WBEngageManagerStateFailed", @"WBEngageManagerReceivedAdvertisement", @"WBEngageManagerOff"];
}

- (void) engageEngine:(id)engageEngine didDetermineState:(WBEngageManagerState)state
{
    switch (state) {
        case WBEngageManagerStateNotDetermined:
            NSLog(@"State: not initialized");
            if (hasListeners) {
                [self sendEventWithName:@"WBEngageManagerStateNotDetermined" body:@{@"state" : @"not initialized"}];
            }
            break;
        case WBEngageManagerStateInitializing:
            NSLog(@"State: initializing");
            if (hasListeners) {
                [self sendEventWithName:@"WBEngageManagerStateInitializing" body:@{@"state" : @"initializing"}];
            }
            break;
        case WBEngageManagerStatePaused:
            NSLog(@"State: paused");
            if (hasListeners) {
                [self sendEventWithName:@"WBEngageManagerStatePaused" body:@{@"state" : @"paused"}];
            }
            break;
        case WBEngageManagerStateScanning:
            NSLog(@"State: active");
            if (hasListeners) {
                [self sendEventWithName:@"WBEngageManagerStateScanning" body:@{@"state" : @"active"}];
            }
            break;
        case WBEngageManagerStateFailed:
            NSLog(@"State: received an error");
            if (hasListeners) {
                [self sendEventWithName:@"WBEngageManagerStateFailed" body:@{@"state" : @"received an error"}];
            }
            break;
    }
}

- (void)engageEngine:(id)engageEngine didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError: %@", error);
    if ([error.domain isEqualToString:WBErrorDomain]) {
        // self.error = error.code;
        switch (error.code) {
            case WBErrorBackgroundRefreshDenied:
                break;
            case WBErrorBackgroundRefreshRestricted:
                break;
            case WBErrorBluetoothUnauthorized:
                break;
            case WBErrorBluetoothOff:
                if (hasListeners) {
                    [self sendEventWithName:@"WBEngageManagerOff" body:@{@"state" : @"Bluetooth off"}];
                }
                break;
            case WBErrorBluetoothUnsupported:
                break;
            case WBErrorInvalidAPIKey:
                break;
            case WBErrorLocationServicesDisabled:
                break;
            case WBErrorLocationServicesUnauthorized:
                break;
            case WBErrorUnknown:
                break;
        }
    } else {
        // self.error = -1;
    }
}

- (void)engageEngine:(id)engageEngine shouldPresentAdvertisement:(WBEngageAdvertisement *)advertisement
{
    NSLog(@"Received an advertisement: %@", advertisement);
    if (hasListeners) {
        [self sendEventWithName:@"WBEngageManagerReceivedAdvertisement" body:@{@"data" : advertisement}];
    }
    [advertisement markOpened];
    [advertisement performSelector:@selector(markClaimed) withObject:nil afterDelay:3.0];
    
}
@end
