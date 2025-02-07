// imageMappings.ts
// imageMappings.ts

// Define a type for the image map
type ImageMap = {
  [key: string]: ReturnType<typeof require>;
};

// Define the image map with explicit types
const imageMap: ImageMap = {
  ShoulderStretch: require('@/assets/images/BendXR_ExercisePics/ShoulderStretch.png'),
  KneelHeadRotL: require('@/assets/images/BendXR_ExercisePics/KneelHeadRotL.png'),
  KneelHeadRotR: require('@/assets/images/BendXR_ExercisePics/KneelHeadRotR.png'),
  SeatedSideStretch: require('@/assets/images/BendXR_ExercisePics/SeatedSideStretch.png'),
  CobraStretch: require('@/assets/images/BendXR_ExercisePics/CobraStretch.png'),
  LungeTwistL: require('@/assets/images/BendXR_ExercisePics/LungeTwistL.png'),
  LungeTwistR: require('@/assets/images/BendXR_ExercisePics/LungeTwistR.png'),
  LowLungeArmRaiseL: require('@/assets/images/BendXR_ExercisePics/LowLungeArmRaiseL.png'),
  LowLungeArmRaiseR: require('@/assets/images/BendXR_ExercisePics/LowLungeArmRaiseR.png'),
  FigureFourL: require('@/assets/images/BendXR_ExercisePics/FigureFourL.png'),
  FigureFourR: require('@/assets/images/BendXR_ExercisePics/FigureFourR.png'),
  HamstringStretch: require('@/assets/images/BendXR_ExercisePics/HamstringStretch.png'),
  ForwardFold: require('@/assets/images/BendXR_ExercisePics/ForwardFold.png'),
  SeatedSpinalTwistL: require('@/assets/images/BendXR_ExercisePics/SeatedSpinalTwistL.png'),
  SeatedSpinalTwistR: require('@/assets/images/BendXR_ExercisePics/SeatedSpinalTwistR.png'),
  HipRotationL: require('@/assets/images/BendXR_ExercisePics/HipRotationL.png'),
  HipRotationR: require('@/assets/images/BendXR_ExercisePics/HipRotationR.png'),
  JumpingJacks: require('@/assets/images/BendXR_ExercisePics/JumpingJacks.png'),
  ArmRotations: require('@/assets/images/BendXR_ExercisePics/ArmRotations.png'),
  ForwardFoldArmCross: require('@/assets/images/BendXR_ExercisePics/ForwardFoldArmCross.png'),
  StandingSideStretch: require('@/assets/images/BendXR_ExercisePics/StandingSideStretch.png'),
  SupineHamstringStretch: require('@/assets/images/BendXR_ExercisePics/SupineHamstringStretch.png'),
  SideLungeStretch: require('@/assets/images/BendXR_ExercisePics/SideLungeStretch.png'),
  CircularArmRaiseToeTouchL: require('@/assets/images/BendXR_ExercisePics/CircularArmRaiseToeTouchL.png'),
  CircularArmRaiseToeTouchR: require('@/assets/images/BendXR_ExercisePics/CircularArmRaiseToeTouchR.png'),
  ForwardReachL: require('@/assets/images/BendXR_ExercisePics/ForwardReachL.png'),
  ForwardReachR: require('@/assets/images/BendXR_ExercisePics/ForwardReachR.png'),
  Squats: require('@/assets/images/BendXR_ExercisePics/Squats.png'),
  SquatsWithPunch: require('@/assets/images/BendXR_ExercisePics/SquatsWithPunch.png'),
  Lunges: require('@/assets/images/BendXR_ExercisePics/Lunges.png'),
  SitUps: require('@/assets/images/BendXR_ExercisePics/SitUps.png'),
  SitUpsHandsHead: require('@/assets/images/BendXR_ExercisePics/SitUpsHandsHead.png'),
  PushUps: require('@/assets/images/BendXR_ExercisePics/PushUps.png'),
  CloseHandPushUps: require('@/assets/images/BendXR_ExercisePics/CloseHandPushUps.png'),
  OneHandPushUpL: require('@/assets/images/BendXR_ExercisePics/OneHandPushUpL.png'),
  OneHandPushUpR: require('@/assets/images/BendXR_ExercisePics/OneHandPushUpR.png'),
  MountainClimbers: require('@/assets/images/BendXR_ExercisePics/MountainClimbers.png'),
  SitUpElbowKneeRot: require('@/assets/images/BendXR_ExercisePics/SitUpElbowKneeRot.png'),
  SupineHipBridge: require('@/assets/images/BendXR_ExercisePics/SupineHipBridge.png'),
  SeatedLegPushRot: require('@/assets/images/BendXR_ExercisePics/SeatedLegPushRot.png'),
  BicycleCrunches: require('@/assets/images/BendXR_ExercisePics/BicycleCrunches.png'),

  // Add all other mappings here
};

export default imageMap;
