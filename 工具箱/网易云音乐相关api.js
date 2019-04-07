//JavaScript for mozilla rhino
//API
NeteaseCloudMusic = {
	//给Cookie用的
	MUSUC_U: "1a4372514fdafca040210ec0652560d35157299fb65cde76f2d3fd620bb608a15ae0d78b925f50ab1ca91cba586f29c731b299d667364ed3",
	__csrf: "8ea789fbbf78b50e6b64b5ebbb786176",
	deviceId: "86e757286f4bf940a20aed3abb328cae",
	//代理
	useragents: [
		'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
		'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
		'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
		'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586'
	],
	//获取随机UserAgent
	getRandomUserAgent: function() {
		return this.useragents[Math.floor(Math.random() * this.useragents.length)];
	},
	//获取Header
	getHeader: function() {
		return [
			["Referer", "http://music.163.com/"],
			["Host", "interface.music.163.com"],
			["Origin", "http://music.163.com/"],
			["Conection", "Keep-Alive"],
			["Content-Type", "application/x-www-form-urlencoded"],
			["User-Agent", this.getRandomUserAgent()],
			["Cookie", "__remember_me=true; MUSIC_U=" + this.MUSIC_U + "; __csrf=" + this.__csrf + "; os=android; osver=7.1.2; appver=5.4.1; deviceId=" + this.devideId + ";"]
		];
	},
	getSongInputStreamAvaliableHeader: function(url) {
		return [
			["User-Agent", this.getRandomUserAgent()],
			["Host", url],
			["Referer", "http://music.163.com/api/"], 
			["Range", "0-"],
			["Connection", "Keep-Alive"]
		];
	}, 
	//API
	API: {
		search: function(key, size, page, type) {
			var url = "https://music.163.com/weapi/search/get?csrf_token=";
			var params = JSON.stringify({
				s: key,
				type: type,
				offset: (page - 1) * size,
				limit: size,
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},
		search_suggest: function(keyword) {
			var url = "https://music.163.com/weapi/search/suggest/web";
			var params = JSON.stringify({
				csrf_token: "",
				s: keyword || ""
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},
		user_playlist: function(uid) {
			var url = "https://music.163.com/api/user/playlist?uid=" + uid + "&offset=0&limit=1000";
			return NeteaseCloudMusic.Operator.get(url, NeteaseCloudMusic.getHeader());
		},
		detail_user: function(uid) {
			var url = "https://music.163.com/weapi/v1/user/detail/" + uid;
			var params = JSON.stringify({
				csrf_token: ""
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},
		detail_album: function(id) {
			var url = "http://music.163.com/weapi/v1/album/=" + id + "?csrf_token=";
			var params = JSON.stringify({
				album_id: id,
				csrf_token: "",
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},

		detail_song: function(id) {
			var url = "http://music.163.com/api/song/detail/?id=" + id + "&ids=[" + id + "]";
			return NeteaseCloudMusic.Operator.get(url, NeteaseCloudMusic.getHeader());
		},
		detail_song_mp3: function(id, br) {
			var url = "http://music.163.com/weapi/song/enhance/player/url";
			var params = JSON.stringify({
				ids: [id], 
				br: br || 999000, 
				csrf_token: "",
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},
		detail_song_comments: function(id, size, page) {
			var url = "http://music.163.com/weapi/v1/resource/comments/R_SO_4_" + id;
			var params = JSON.stringify({
				rid: id,
				offset: (page - 1) * size,
				limit: size,
				csrf_token: "",
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},
		detail_artist: function(id) {
			var url = "http://music.163.com/weapi/v1/artist/" + id;
			return NeteaseCloudMusic.Operator.get(url, NeteaseCloudMusic.getHeader());
		},
		/*detail_: function(id) {
			var url = "";
			var params = JSON.stringify({
				csrf_token: "",
			}, "", 0);
			var encrypted = NeteaseCloudMusic.EncryptUtils.encryptParam(params);
			return NeteaseCloudMusic.Operator.post(url, encrypted, NeteaseCloudMusic.getHeader());
		},*/

	},

	//加密算法
	EncryptUtils: {
		aesEncrypt: function(text, key) {
			var ivParameterSpec = new javax.crypto.spec.IvParameterSpec(java.lang.String("0102030405060708").getBytes("UTF-8"));
			var secretKeySpec = new javax.crypto.spec.SecretKeySpec(java.lang.String(key).getBytes("UTF-8"), "AES");
			var cipher = javax.crypto.Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
			var encrypted = cipher.doFinal(java.lang.String(text).getBytes());
			return android.util.Base64.encodeToString(encrypted, 0);
		},
		rsaEncrypt: function(text, pubKey, modulus) {
			text = new java.lang.StringBuilder(text).reverse().toString();
			var biginteger = new java.math.BigInteger(java.lang.String.format("%x", new java.math.BigInteger(1, text.getBytes())), 16).modPow(new java.math.BigInteger(pubKey, 16), new java.math.BigInteger(modulus, 16));
			var hexString = java.lang.String(biginteger.toString(16));
			if (java.lang.String(hexString).length() >= 256) {
				return hexString.substring(hexString.length() - 256, hexString.length());
			} else {
				while (java.lang.String(hexString).length() < 256) {
					hexString = 0 + hexString;
				}
				return hexString;
			}
		},
		getRandomString: function(length) {
			var string = "0123456789abcde";
			var stringBuffer = new java.lang.StringBuffer();
			for (var i = 0; i < length; i++) {
				stringBuffer.append(string.charAt(Math.round(Math.random() * (string.length - 1))));
			}
			return stringBuffer.toString();
		},
		encryptParam: function(text) {
			if (text == null) return "params=null&encSecKey=null";
			var modulus = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7" +
				"b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280" +
				"104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932" +
				"575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b" +
				"3ece0462db0a22b8e7";
			var nonce = "0CoJUm6Qyw8W8jud";
			var pubKey = "010001";
			var secKey = this.getRandomString(16);
			var encText = this.aesEncrypt(this.aesEncrypt(text, nonce), secKey);
			var encSecKey = this.rsaEncrypt(secKey, pubKey, modulus);
			try {
				return ("params=" + java.net.URLEncoder.encode(encText, "UTF-8") + "&encSecKey=" + java.net.URLEncoder.encode(encSecKey, "UTF-8"));
			} catch (error) {
				return "params=null&encSecKey=null";
			}
		},
		md5Encrypt: function(string) {
			string = java.net.URLEncoder.encode(string);
			var messageDigest = java.security.MessageDigest.getInstance("MD5");
			var charArr = java.lang.String(string).toCharArray();
			var byteArr = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, charArr.length);
			for (var i = 0; i < charArr.length; i++) byteArr[i] = charArr[i];
			var md5Bytes = messageDigest.digest(byteArr);
			var hexValue = new java.lang.StringBuffer();
			for (var i = 0; i < md5Bytes.length; i++) {
				var val = md5Bytes[i] & 0xff;
				if (val < 16) hexValue.append("0");
				hexValue.append(java.lang.Integer.toHexString(val));
			}
			return hexValue.toString();
		}
	},
	//POST与GET
	Operator: {
		post: function(url, param, headers) {
			var result = "";
			var bufferedReader = null;
			var printWriter = null;
			try {
				var urlConnect = new java.net.URL(url);
				var connection = urlConnect.openConnection();
				for (var i in headers) {
					connection.setRequestProperty(headers[i][0], headers[i][1]);
				}
				connection.setConnectTimeout(12000);
				connection.setDoOutput(true);
				connection.setDoInput(true);
				printWriter = new java.io.PrintWriter(connection.getOutputStream());
				printWriter.print(param);
				printWriter.flush();
				bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
				var line;
				while ((line = bufferedReader.readLine()) != null) {
					result += line;
				}
				if (bufferedReader != null) bufferedReader.close();
				if (printWriter != null) printWriter.close();
			} catch (error) {
				if (bufferedReader != null) bufferedReader.close();
				if (printWriter != null) printWriter.close();
			}
			return result;
		},
		get: function(url, headers) {
			var result = "";
			var bufferedReader = null;
			try {
				var urlConnect = new java.net.URL(url);
				var connection = urlConnect.openConnection();
				for (var i in headers) {
					connection.setRequestProperty(headers[i][0], headers[i][1]);
				}
				connection.setConnectTimeout(12000);
				connection.setDoInput(true);
				bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
				var line;
				while ((line = bufferedReader.readLine()) != null) {
					result += line;
				}
				if (bufferedReader != null) bufferedReader.close();
			} catch (error) {
				if (bufferedReader != null) bufferedReader.close();
			}
			return result;
		},
	}, 
	Type: {
		SONG: 1,
		ALBUM: 10,
		ARTIST: 100,
		PLAYLIST: 1000,
		USER: 1002,
		RADIO: 1009,
	},
}
