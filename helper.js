export function getFOV(height, perspective) {
    return 2 * Math.atan(height / (2 * perspective));
}