function coordtransform() {
  // 定义一些常量
  let x_PI = (3.14159265358979324 * 3000.0) / 180.0;
  let PI = 3.1415926535897932384626;
  let a = 6378245.0;
  let ee = 0.00669342162296594323;

  let bd09togcj02 = function bd09togcj02(bd_lon, bd_lat) {
    bd_lon = +bd_lon;
    bd_lat = +bd_lat;
    let x = bd_lon - 0.0065;
    let y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
  };

  let gcj02tobd09 = function gcj02tobd09(lng, lat) {
    lat = +lat;
    lng = +lng;
    let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
  };

  let wgs84togcj02 = function wgs84togcj02(lng, lat) {
    lat = +lat;
    lng = +lng;
    if (out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      let dlat = transformlat(lng - 105.0, lat - 35.0);
      let dlng = transformlng(lng - 105.0, lat - 35.0);
      let radlat = (lat / 180.0) * PI;
      let magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      let sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
      let mglat = lat + dlat;
      let mglng = lng + dlng;
      return [mglng, mglat];
    }
  };

  let gcj02towgs84 = function gcj02towgs84(lng, lat) {
    lat = +lat;
    lng = +lng;
    if (out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      let dlat = transformlat(lng - 105.0, lat - 35.0);
      let dlng = transformlng(lng - 105.0, lat - 35.0);
      let radlat = (lat / 180.0) * PI;
      let magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      let sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
      let mglat = lat + dlat;
      let mglng = lng + dlng;
      return [lng * 2 - mglng, lat * 2 - mglat];
    }
  };

  let transformlat = function transformlat(lng, lat) {
    lat = +lat;
    lng = +lng;
    let ret =
      -100.0 +
      2.0 * lng +
      3.0 * lat +
      0.2 * lat * lat +
      0.1 * lng * lat +
      0.2 * Math.sqrt(Math.abs(lng));
    ret +=
      ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
      3.0;
    ret +=
      ((160.0 * Math.sin((lat / 12.0) * PI) +
        320 * Math.sin((lat * PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  };

  let transformlng = function transformlng(lng, lat) {
    lat = +lat;
    lng = +lng;
    let ret =
      300.0 +
      lng +
      2.0 * lat +
      0.1 * lng * lng +
      0.1 * lng * lat +
      0.1 * Math.sqrt(Math.abs(lng));
    ret +=
      ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
      3.0;
    ret +=
      ((150.0 * Math.sin((lng / 12.0) * PI) +
        300.0 * Math.sin((lng / 30.0) * PI)) *
        2.0) /
      3.0;
    return ret;
  };

  let out_of_china = function out_of_china(lng, lat) {
    lat = +lat;
    lng = +lng;
    // 纬度3.86~53.55,经度73.66~135.05
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  };

  return {
    bd09togcj02: bd09togcj02,
    gcj02tobd09: gcj02tobd09,
    wgs84togcj02: wgs84togcj02,
    gcj02towgs84: gcj02towgs84,
  };
}

export function coordinateTransform(lng, lat) {
  const transformObj = coordtransform();
  const [tlng, tlat] = transformObj.bd09togcj02(lng, lat);
  return transformObj.gcj02towgs84(tlng, tlat);
}
