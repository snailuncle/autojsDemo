"ui";
var androidx = Packages.androidx;
var color = "#009688";
ui.layout(
	<drawer id="drawer">
		<vertical h="*" w="*">
			<appbar>
				<toolbar id="toolbar" title="Intent生成器 V0.4"/>
			</appbar>
			<frame id="body" h="*" w="*">
			</frame>
		</vertical>
		<vertical layout_gravity="left" bg="#ffffff" w="280">
			<list id="menu">
				<horizontal bg="?selectableItemBackground" w="*">
					<img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
					<text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
				</horizontal>
			</list>
		</vertical>
	</drawer>
);
var currentUi;
activity.setSupportActionBar(ui.toolbar);
ui.toolbar.setupWithDrawer(ui.drawer);
ui.searchBar = new androidx.appcompat.widget.SearchView(activity);
ui.searchBar.setQueryHint("搜索...");
ui.searchBar.setOnQueryTextListener({
	onQueryTextSubmit : function(query) {
		return false;
	},
	onQueryTextChange : function(query) {
		if (currentUi && currentUi.filter) currentUi.filter(String(query));
		return false;
	}
});
ui.menu.on("item_click", item => {
	if (item.onclick) item.onclick();
	ui.drawer.closeDrawers();
});
ui.emitter.on("create_options_menu", menu => {
    var mSearch = menu.add("搜索");
	mSearch.setIcon(org.autojs.autojs.R.drawable.ic_search_white_36dp);
	mSearch.setActionView(ui.searchBar);
	mSearch.setShowAsAction(mSearch.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW | mSearch.SHOW_AS_ACTION_ALWAYS);
});
function setContainer(v) {
	ui.body.removeAllViews();
	ui.body.addView(v, new android.widget.FrameLayout.LayoutParams(-1, -1));
}

var ResultIntent = { 
	intentCallback : {},
	init : function() {
		ui.emitter.on("activity_result", (requestCode, resultCode, data) => {
			this.onActivityResult(requestCode, resultCode, data);
		});
	},
	startActivityForResult : function(intent, callback) {
		var i;
		for (i = 0; i < 65536; i++) {
			if (!(i in this.intentCallback)) break;
		}
		if (i >= 65536) {
			toast("启动Intent失败：同时请求的Intent过多");
			return;
		}
		this.intentCallback[i] = callback;
		activity.startActivityForResult(intent, i);
	},
	onActivityResult : function(requestCode, resultCode, data) {
		var cb = this.intentCallback[requestCode];
		if (!cb) return;
		delete this.intentCallback[requestCode];
		cb(resultCode, data);
	}
};
ResultIntent.init();
var URIUtils = {
	uriToFile : function(uri) { //Source : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
		var r = null, cursor, column_index, selection = null, selectionArgs = null, isKitKat = android.os.Build.VERSION.SDK_INT >= 19, docs;
		if (uri.getScheme().equalsIgnoreCase("content")) {
			if (isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)) {
				if (String(uri.getAuthority()) == "com.android.externalstorage.documents") {
					docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
					if (docs[0] == "primary") {
						return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
					}
				} else if (String(uri.getAuthority()) == "com.android.providers.downloads.documents") {
					uri = android.content.ContentUris.withAppendedId(
						android.net.Uri.parse("content://downloads/public_downloads"),
						parseInt(android.provider.DocumentsContract.getDocumentId(uri))
					);
				} else if (String(uri.getAuthority()) ==  "com.android.providers.media.documents") {
					docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
					if (docs[0] == "image") {
						uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
					} else if (docs[0] == "video") {
						uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
					} else if (docs[0] == "audio") {
						uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
					}
					selection = "_id=?";
					selectionArgs = [docs[1]];
				}
			}
			try {
				cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
				if (cursor && cursor.moveToFirst()) {
					r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
				}
			} catch(e) {log(e)}
			if (cursor) cursor.close();
			return r;
		} else if (uri.getScheme().equalsIgnoreCase("file")) {
			return String(uri.getPath());
		}
		return null;
	},
	fileToUri : function(uri) {
		if (app.parseUri) {
			return app.parseUri(uri);
		} else {
			return android.net.Uri.parse(uri);
		}
	}
};

function startChooseFile(mimeType, callback) {
	var i = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
	i.setType(mimeType);
	ResultIntent.startActivityForResult(i, function(resultCode, data) {
		if (resultCode != activity.RESULT_OK) return;
		var f = URIUtils.uriToFile(data.getData());
		callback(f, data.getType() || mimeType);
	});
}

ui.menu.setDataSource([{
	title: "首页",
	icon: "@drawable/ic_android_black_48dp",
	onclick: () => aboutUi.activate()
}, {
	title: "启动Activity",
	icon: "@drawable/ic_android_black_48dp",
	onclick: () => launchUi.activate()
}, {
	title: "隐藏Activity",
	icon: "@drawable/ic_android_black_48dp",
	onclick: () => hiddenUi.activate()
}, {
	title: "打开URI",
	icon: "@drawable/ic_android_black_48dp",
	onclick: () => openUi.activate()
}, {
	title: "退出",
	icon: "@drawable/ic_exit_to_app_black_48dp",
	onclick: () => ui.finish()
}]);
var aboutUi = {
	ui : ui.inflate(
		<vertical padding="15dp">
			<text textColor="black" textSize="15sp">本生成器用于生成Auto.js可用的启动Intent的代码</text>
		</vertical>
	),
	activate : function() {
		setContainer(this.ui);
	}
}
var TAB = "    ";
function stringifyIntentFlag(flag) {
	var i, e, o = android.content.Intent, keys, r = [];
	keys = Object.keys(o).filter(e => e.startsWith("FLAG_") && !e.startsWith("FLAG_RECEIVER_"));
	for (i in keys) {
		e = o[keys[i]];
		if ((flag & e) == e) r.push(keys[i].slice(5).toLowerCase());
	}
	return r;
}
function intentAsJson(intent) {
	var r = [], t;
	if (intent.action) r.push("action: " + JSON.stringify(String(intent.action)));
	if (intent.type) r.push("type: " + JSON.stringify(String(intent.type)));
	if (intent.data) r.push("data: " + JSON.stringify(String(intent.data)));
	if (intent.component) {
		r.push("packageName: " + JSON.stringify(String(intent.component.packageName)));
		r.push("className: " + JSON.stringify(String(intent.component.className)));
	}
	t = intent.categories;
	if (t) {
		r.push("category: " + JSON.stringify(t));
	}
	if (intent.flags != 0) {
		r.push("flags: " + JSON.stringify(stringifyIntentFlag(intent.flags)));
	}
	return "{\n" + TAB + r.join(",\n" + TAB) + "\n}";
}
function copyIntent(code) {
	dialogs.select("操作", ["查看对象代码", "复制为app.intent", "复制为app.startActivity", "直接启动"], i => {
		switch (i) {
			case 0:
			dialogs.alert("Intent对象代码", code);
			break;
			case 1:
			setClip("app.intent(" + code + ");");
			break;
			case 2:
			setClip("app.startActivity(" + code + ");");
			break;
			case 3:
			try {
				eval("app.startActivity(" + code + ");");
			} catch(e) {
				toast("启动Intent失败\n" + e);
			}
			break;
		}
	});
}
var launchUi = {
	ui : ui.inflate(
		<vertical gravity="center">
			<progressbar id="launch_progress" />
			<list id="launch_list" h="*" w="*">
				<vertical padding="8dp" w="*">
					<text textColor="black" textSize="14sp" text="{{this.name}}" />
					<text textSize="12sp" text="{{this.packageName}}" />
				</vertical>
			</list>
		</vertical>
	),
	initList : function() {
		var self = this;
		this.listData = null;
		ui.launch_progress.visibility = android.view.View.VISIBLE;
		ui.launch_list.visibility = android.view.View.GONE;
		threads.start(function() {
			self.listData = self.loadList();
			ui.run(function() {
				ui.launch_list.setDataSource(self.filterList(self.searchText));
				ui.launch_progress.visibility = android.view.View.GONE;
				ui.launch_list.visibility = android.view.View.VISIBLE;
			});
		});
		ui.launch_list.on("item_click", item => {
			copyIntent(item.intent);
		});
	},
	loadList : function() {
		var pm = context.getPackageManager();
		var lp = pm.getInstalledPackages(0).toArray();
		var i, r = [], t;
		for (i in lp) {
			if (!lp[i].applicationInfo) continue;
			if (!(t = pm.getLaunchIntentForPackage(lp[i].packageName))) continue;
			r.push({
				name : String(pm.getApplicationLabel(lp[i].applicationInfo)),
				packageName : String(lp[i].packageName),
				intent : intentAsJson(t)
			});
		}
		r.sort((a, b) => a.name.localeCompare(b.name));
		return r;
	},
	filterList : function(query) {
		if (!query) return this.listData;
		return this.listData.filter(e => e.name.indexOf(query) >= 0 || e.packageName.indexOf(query) >= 0);
	},
	activate : function() {
		currentUi = this;
		this.searchText = "";
		setContainer(this.ui);
		if (!this.inited) this.initList();
		this.inited = true;
	},
	filter : function(query) {
		this.searchText = query;
		if (!this.listData) return;
		ui.launch_list.setDataSource(this.filterList(query));
	}
}

function shortenName(name) {
	var i = name.lastIndexOf(".");
	if (i < 0) return name;
	return name.slice(i + 1);
}

var hiddenUi = {
	ui : ui.inflate(
		<vertical gravity="center">
			<progressbar id="hidden_progress" />
			<list id="hidden_list" h="*" w="*">
				<vertical padding="8dp" w="*">
					<text textColor="black" textSize="14sp" text="{{this.name}}" />
					<text textSize="12sp" text="{{this.packageName + ' (' + this.intents.length + '个Activity)'}}" />
				</vertical>
			</list>
		</vertical>
	),
	initList : function() {
		var self = this;
		ui.hidden_progress.visibility = android.view.View.VISIBLE;
		ui.hidden_list.visibility = android.view.View.GONE;
		threads.start(function() {
			self.listData = self.loadList();
			ui.run(function() {
				ui.hidden_list.setDataSource(self.filterList(self.searchText));
				ui.hidden_progress.visibility = android.view.View.GONE;
				ui.hidden_list.visibility = android.view.View.VISIBLE;
			});
		});
		ui.hidden_list.on("item_click", item => {
			dialogs.select("选择Activity", item.intents.map(e => e.name), i => {
				if (i < 0) return;
				copyIntent("{\n" +
					TAB + "action: " + JSON.stringify("android.intent.action.VIEW") + ", //此处可为其他值\n" +
					TAB + "packageName: " + JSON.stringify(item.packageName) + ",\n" +
					TAB + "className: " + JSON.stringify(item.intents[i].className) + "\n" +
					TAB + "//此处可以加入其他内容，如data、extras\n" +
				"}");
			});
		});
	},
	loadList : function() {
		var pm = context.getPackageManager();
		var lp = pm.getInstalledPackages(0).toArray();
		var i, j, cur, r = [], e, activities;
		for (i in lp) {
			cur = {
				name : pm.getApplicationLabel(lp[i].applicationInfo),
				packageName : lp[i].packageName,
				intents : []
			}
			try {
				activities = pm.getPackageInfo(lp[i].packageName, 1).activities;
				for (j in activities) {
					e = activities[j];
					if (!e.enabled || !e.exported) continue;
					cur.intents.push({
						name : e.labelRes != 0 ?
							e.loadLabel(pm) + " (" + shortenName(e.name) + ")" :
							shortenName(e.name),
						className : e.name
					});
				}
			} catch(e) {log(e)}
			if (cur.intents.length) r.push(cur);
		}
		r.sort((a, b) => a.name.localeCompare(b.name));
		return r;
	},
	filterList : function(query) {
		if (!query) return this.listData;
		return this.listData.filter(e => e.name.indexOf(query) >= 0 || e.packageName.indexOf(query) >= 0);
	},
	activate : function() {
		currentUi = this;
		this.searchText = "";
		setContainer(this.ui);
		if (!this.inited) this.initList();
		this.inited = true;
	},
	filter : function(query) {
		this.searchText = query;
		if (!this.listData) return;
		ui.hidden_list.setDataSource(this.filterList(query));
	}
}

function compatUriToSource(uri) {
	if (app.parseUri) {
		return "app.parseUri(" + JSON.stringify(uri) + ")";
	} else {
		return JSON.stringify(uri);
	}
}


var openUi = {
	ui : ui.inflate(
		<vertical>
			<horizontal gravity="center">
				<text id="open_uri" textColor="black" textSize="14sp" layout_weight="1" gravity="center" padding="10dp"/>
				<button id="open_edituri" textSize="14sp" h="*">编辑</button>
			</horizontal>
			<vertical gravity="center" h="*" w="*">
				<progressbar id="open_progress"/>
				<list id="open_list" h="*" w="*">
					<vertical padding="8dp" w="*">
						<text textColor="black" textSize="14sp" text="{{this.name}}" />
						<text textSize="12sp" text="{{this.packageLabel}}" />
					</vertical>
				</list>
			</vertical>
		</vertical>
	),
	initUI : function() {
		ui.open_edituri.on("click", () => {
			this.selectUri((uri, mimeType) => {
				this.uri = uri;
				this.mimeType = mimeType;
				this.updateUI();
			});
		});
		ui.open_list.on("item_click", item => {
			copyIntent("{\n" +
				TAB + "action: " + JSON.stringify("android.intent.action.VIEW") + ",\n" +
				TAB + "packageName: " + JSON.stringify(item.packageName) + ",\n" +
				TAB + "className: " + JSON.stringify(item.className) + ",\n" +
				TAB + "data: " + compatUriToSource(this.uri) + ",\n" +
				(this.mimeType ? TAB + "type: " + JSON.stringify(this.mimeType) + ",\n": "") +
				TAB + "flags: " + JSON.stringify(stringifyIntentFlag(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION | android.content.Intent.FLAG_GRANT_WRITE_URI_PERMISSION)) + ",\n" +
			"}");
		});
		this.updateUI();
	},
	selectUri : function(callback) {
		dialogs.select("选择URI", ["调用外部文件选择器", "手动输入URI"], i => {
			switch (i) {
				case 0:
				startChooseFile("*/*", (path, type) => {
					if (!path) return toast("文件路径获取失败，请尝试其他方式");
					callback("file://" + path, type);
				});
				break;
				case 1:
				dialogs.rawInput("输入URI", "", text => {
					callback(text);
				});
			}
		});
	},
	updateUI : function() {
		var self = this, uuid = this.uuid = {};
		this.uri = this.uri || "";
		this.mimeType = this.mimeType == "*/*" ? this.getMime() || "*/*" : this.mimeType;
		ui.open_uri.setText("URI: " + (this.uri ? this.uri + (this.mimeType ? " (" + this.mimeType + ")" : "") : "(空)"));
		ui.open_progress.visibility = android.view.View.VISIBLE;
		ui.open_list.visibility = android.view.View.GONE;
		threads.start(function() {
			self.listData = self.uri ? self.loadList() : [];
			ui.run(function() {
				if (self.uuid != uuid) return;
				ui.open_list.setDataSource(self.filterList(self.searchText));
				ui.open_progress.visibility = android.view.View.GONE;
				ui.open_list.visibility = android.view.View.VISIBLE;
			});
		});
	},
	loadList : function() {
		var pm = context.getPackageManager();
		var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
		if (this.mimeType) {
			intent.setDataAndType(URIUtils.fileToUri(this.uri), this.mimeType);
		} else {
			intent.setData(URIUtils.fileToUri(this.uri));
		}
		var resolveList = pm.queryIntentActivities(intent, 0);
		var i, r = [], e, plabel;
		r.length = resolveList.size();
		for (i = 0; i < r.length; i++) {
			e = resolveList.get(i);
			plabel = pm.getApplicationLabel(e.activityInfo.applicationInfo);
			r[i] = {
				name : (e.labelRes != 0 ?
					e.loadLabel(pm) :
					e.activityInfo.labelRes != 0 ?
						e.activityInfo.loadLabel(pm) :
						plabel) + " (" + shortenName(e.activityInfo.name) + ")",
				packageName : e.activityInfo.packageName,
				className : e.activityInfo.name,
				packageLabel : plabel
			}
		}
		r.sort((a, b) => a.packageLabel.localeCompare(b.packageLabel));
		return r;
	},
	getMime : function() {
		var map = android.webkit.MimeTypeMap.getSingleton();
		return map.getMimeTypeFromExtension(map.getFileExtensionFromUrl(this.uri));
	},
	filterList : function(query) {
		if (!query) return this.listData;
		return this.listData.filter(e => e.name.indexOf(query) >= 0 || e.packageName.indexOf(query) >= 0 || e.className.indexOf(query) >= 0 || e.packageLabel.indexOf(query) >= 0);
	},
	activate : function() {
		currentUi = this;
		this.searchText = "";
		setContainer(this.ui);
		if (!this.inited) this.initUI();
		this.inited = true;
	},
	filter : function(query) {
		this.searchText = query;
		if (!this.listData) return;
		ui.open_list.setDataSource(this.filterList(query));
	}
}
aboutUi.activate();