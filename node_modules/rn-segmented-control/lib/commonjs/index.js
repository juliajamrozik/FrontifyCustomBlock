"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeResponsiveScreen = require("react-native-responsive-screen");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultShadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1
  },
  shadowOpacity: 0.025,
  shadowRadius: 1,
  elevation: 1
};
const DEFAULT_SPRING_CONFIG = {
  stiffness: 150,
  damping: 20,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001
};

const SegmentedControl = _ref => {
  let {
    segments,
    currentIndex,
    onChange,
    badgeValues = [],
    isRTL = false,
    containerMargin = 0,
    activeTextStyle,
    inactiveTextStyle,
    segmentedControlWrapper,
    pressableWrapper,
    tileStyle,
    activeBadgeStyle,
    inactiveBadgeStyle,
    badgeTextStyle
  } = _ref;
  const width = (0, _reactNativeResponsiveScreen.widthPercentageToDP)('100%') - containerMargin * 2;
  const translateValue = width / segments.length;
  const tabTranslateValue = (0, _reactNativeReanimated.useSharedValue)(0); // useCallBack with an empty array as input, which will call inner lambda only once and memoize the reference for future calls

  const memoizedTabPressCallback = _react.default.useCallback(index => {
    onChange(index);
  }, [onChange]);

  (0, _react.useEffect)(() => {
    // If phone is set to RTL, make sure the animation does the correct transition.
    const transitionMultiplier = isRTL ? -1 : 1;
    tabTranslateValue.value = (0, _reactNativeReanimated.withSpring)(currentIndex * (translateValue * transitionMultiplier), DEFAULT_SPRING_CONFIG); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  const tabTranslateAnimatedStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateX: tabTranslateValue.value
      }]
    };
  });
  const finalisedActiveTextStyle = {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
    ...activeTextStyle
  };
  const finalisedInActiveTextStyle = {
    fontSize: 15,
    textAlign: 'center',
    color: '#4b5563',
    ...inactiveTextStyle
  };
  const finalisedActiveBadgeStyle = {
    backgroundColor: '#27272a',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...activeBadgeStyle
  };
  const finalisedInActiveBadgeStyle = {
    backgroundColor: '#6b7280',
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    ...inactiveBadgeStyle
  };
  const finalisedBadgeTextStyle = {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
    ...badgeTextStyle
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.defaultSegmentedControlWrapper, segmentedControlWrapper]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.movingSegmentStyle, defaultShadowStyle, tileStyle, _reactNative.StyleSheet.absoluteFill, {
      width: width / segments.length - 4
    }, tabTranslateAnimatedStyles]
  }), segments.map((segment, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: () => memoizedTabPressCallback(index),
      key: index,
      style: [styles.touchableContainer, pressableWrapper]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.textWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [currentIndex === index ? finalisedActiveTextStyle : finalisedInActiveTextStyle]
    }, segment), badgeValues[index] && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.defaultBadgeContainerStyle, currentIndex === index ? finalisedActiveBadgeStyle : finalisedInActiveBadgeStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: finalisedBadgeTextStyle
    }, badgeValues[index]))));
  }));
};

const styles = _reactNative.StyleSheet.create({
  defaultSegmentedControlWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f3f4f6'
  },
  touchableContainer: {
    flex: 1,
    elevation: 9,
    paddingVertical: 12
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  movingSegmentStyle: {
    top: 0,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 6,
    backgroundColor: '#FFFFFF'
  },
  // Badge Styles
  defaultBadgeContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    width: 16,
    borderRadius: 9999,
    alignContent: 'flex-end'
  }
});

var _default = SegmentedControl;
exports.default = _default;
//# sourceMappingURL=index.js.map