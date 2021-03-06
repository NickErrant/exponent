/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ExUrls
 */
'use strict';

import url from 'url';

const HTTPS_HOSTS = ['exp.host', 'exponentjs.com', 'getexponent.com'];

let ExUrls = {
  normalizeUrl(rawUrl) {
    var components = url.parse(rawUrl, false, true);
    if (
      (components.protocol === 'localhost:') ||
      (components.host == null && !components.protocol && !components.slashes)
    ) {
      if (components.path && components.path.charAt(0) === '@') {
        // try parsing as @user/experience-id shortcut
        components = url.parse('exp://exp.host/' + rawUrl);
      } else {
        // just treat it as a url with no protocol and assume exp://
        components = url.parse('exp://' + rawUrl);
      }
    }
    if (!components.protocol) {
      components.protocol = 'exp:';
      components.slashes = true;
    }
    return url.format(components);
  },

  toHttp(expUrl) {
    if (!(expUrl.startsWith('exp:') || expUrl.startsWith('exps:'))) {
      return expUrl;
    }

    var components = url.parse(expUrl);
    if (HTTPS_HOSTS.indexOf(components.host) !== -1) {
      components.protocol = 'https:';
    } else {
      components.protocol = 'http:';
    }
    return url.format(components);
  },

  toExp(httpUrl) {
    var components = url.parse(httpUrl);
    components.protocol = 'exp:';
    return url.format(components);
  },

  getHostnameForHost(host) {
    return host.split(':')[0];
  },

  getPortForHost(host) {
    let components = host.split(':');
    if (components && components.length === 2) {
      return components[1];
    }
    return -1;
  },
};

export default ExUrls;
