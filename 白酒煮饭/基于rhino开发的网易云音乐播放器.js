"ui";
"use strict";

/*
	NetEase Music (Rhino Edition)
	Copyright © 2018 StageGuard
	Contact : 
		(QQ: 1355416608)
		(Email: beamiscool@qq.com / xuzhenguooffical@gmail.com)
		(WeChat: xuzhenguooffical)
		(BaiduTieba: 拐角处_等你)
		(Weibo: Es_Rappit_Karton)
		(Twiter: wuyaowang_)
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/
/* There are some technical supports from projectXero.
	Contact : (E-mail: projectxero@163.com)
		○ Context (Adapter)
		○ RhinoListAdapter
		○ SelectDialog, Dialog
	Thanks :)
	This is a open source project.
	See: ...
*/


// Context(Adapter) from projectXero
var ctx, host;

const Host = {
	CREATEJS: "CreateJS",
	MODPE: "BlockLauncher(Pro)",
	AUTOJS_UI: "AutoJS(UI Mode)",
	AUTOJS_NONUI: "AutoJS(Non-UI Mode)",
	INNERCORE: "Inner Core",
};

if ("libs_inthis" in this) { //CreateJS
	ctx = libs_inthis;

	function print(str) {
		ctx.sendMessage("toast", String(str));
	}
	print("Loaded in CreateJS.");
	host = Host.CREATEJS;
} else if ("ModPE" in this) { //以ModPE脚本加载(BlockLauncher及衍生App)//application
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	print("Loaded in BlockLauncher(Pro).");
	host = Host.MODPE;
} else if ("activity" in this) { //以AutoJS脚本加载（UI模式）
	ctx = activity;
	toast("Loaded in AutoJS(UI Mode).");
	host = Host.AUTOJS_UI;
} else if ("context" in this) { //以AutoJS脚本加载（非UI模式）
	ctx = context;
	toast("Loaded in AutoJS(Non-UI Mode).");
	host = Host.AUTOJS_NONUI;
} else if ("World" in this) { //在Inner Core中加载
	ctx = Packages.zhekasmirnov.launcher.utils.UIUtils.getContext();
	host = Host.INNERCORE;
} else { //default
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	toast("Unknown host.");
	host = Host.MODPE;
}

const Adapter = {
	length: function(str) {
		try {
			return str.length();
		} catch (e) {
			return str.length;
		}
	},
};

//Scriptable
const scope = this;

//Modules
var G, GUI, DataCollector, NetworkInterface, NeteaseCloudMusic, ConsoleEmulator, APlayer;

//Asynchronous load thread.
new java.lang.Thread(new java.lang.Runnable({
	run: function() {

		var __start_load = (new Date()).getTime();

		G = {
			initialize: function() {
				if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
					this.sdk = 3;
					ctx.setTheme(android.R.style.Theme_Material_Light);
				} else if (android.os.Build.VERSION.SDK_INT >= 11) {
					this.sdk = 2;
					ctx.setTheme(android.R.style.Theme_Holo_Light);
					android.widget.Toast.makeText(ctx, "你的设备SDK低于21，不支持Material Design风格UI，已经替换成Holo风格", android.widget.Toast.LENGTH_LONG).show();
				} else {
					android.widget.Toast.makeText(ctx, "注：您的设备SDK过旧，已不支持该js，请更换Android设备后再运行该js", android.widget.Toast.LENGTH_LONG).show();
					java.lang.Thread.sleep(999999);
				}
				var dm = this.dm = ctx.getResources().getDisplayMetrics();
				this.dp = dm.density;
				this.height = dm.heightPixels;
				this.width = dm.widthPixels;
				this.tbHeight = (function() {
					var clazz = java.lang.Class.forName("com.android.internal.R$dimen");
					var object = clazz.newInstance();
					var height = java.lang.Integer.parseInt(clazz.getField("status_bar_height").get(object).toString());
					return ctx.getResources().getDimensionPixelSize(height);
				}());
				this.applicationThemeColor = (function() {
					var typedValue = new android.util.TypedValue();
					ctx.getTheme().resolveAttribute(android.R.attr.colorAccent, typedValue, true);
					return typedValue.data;
				}());
			},
			AbsListView: android.widget.AbsListView,
			AbsoluteLayout: android.widget.AbsoluteLayout,
			AbsoluteSizeSpan: android.text.style.AbsoluteSizeSpan,
			AbsSavedState: android.view.AbsSavedState,
			AbsSeekBar: android.widget.AbsSeekBar,
			AbsSpinner: android.widget.AbsSpinner,
			AccelerateDecelerateInterpolator: android.view.animation.AccelerateDecelerateInterpolator,
			AccelerateInterpolator: android.view.animation.AccelerateInterpolator,
			AcousticEchoCanceler: android.media.audiofx.AcousticEchoCanceler,
			ActionMode: android.view.ActionMode,
			ActionProvider: android.view.ActionProvider,
			Adapter: android.widget.Adapter,
			AdapterView: android.widget.AdapterView,
			AdapterViewAnimator: android.widget.AdapterViewAnimator,
			AdapterViewFlipper: android.widget.AdapterViewFlipper,
			Advanceable: android.widget.Advanceable,
			AlertDialog: android.app.AlertDialog,
			AlignmentSpan: android.text.style.AlignmentSpan,
			AlphaAnimation: android.view.animation.AlphaAnimation,
			AlphabetIndexer: android.widget.AlphabetIndexer,
			AlteredCharSequence: android.text.AlteredCharSequence,
			AnalogClock: android.widget.AnalogClock,
			AndroidCharacter: android.text.AndroidCharacter,
			Animation: android.view.animation.Animation,
			AnimationDrawable: android.graphics.drawable.AnimationDrawable,
			AnimationSet: android.view.animation.AnimationSet,
			AnimationUtils: android.view.animation.AnimationUtils,
			Animator: android.animation.Animator,
			AnimatorInflater: android.animation.AnimatorInflater,
			AnimatorListenerAdapter: android.animation.AnimatorListenerAdapter,
			AnimatorSet: android.animation.AnimatorSet,
			Annotation: android.text.Annotation,
			AnticipateInterpolator: android.view.animation.AnticipateInterpolator,
			AnticipateOvershootInterpolator: android.view.animation.AnticipateOvershootInterpolator,
			ArcShape: android.graphics.drawable.shapes.ArcShape,
			ArgbEvaluator: android.animation.ArgbEvaluator,
			ArrayAdapter: android.widget.ArrayAdapter,
			ArrowKeyMovementMethod: android.text.method.ArrowKeyMovementMethod,
			AsyncPlayer: android.media.AsyncPlayer,
			AudioEffect: android.media.audiofx.AudioEffect,
			AudioFormat: android.media.AudioFormat,
			AudioManager: android.media.AudioManager,
			AudioRecord: android.media.AudioRecord,
			AudioTimestamp: android.media.AudioTimestamp,
			AudioTrack: android.media.AudioTrack,
			AutoCompleteTextView: android.widget.AutoCompleteTextView,
			AutomaticGainControl: android.media.audiofx.AutomaticGainControl,
			AutoText: android.text.AutoText,
			AvoidXfermode: android.graphics.AvoidXfermode,
			BackgroundColorSpan: android.text.style.BackgroundColorSpan,
			Base64: android.util.Base64,
			Base64InputStream: android.util.Base64InputStream,
			Base64OutputStream: android.util.Base64OutputStream,
			BaseAdapter: android.widget.BaseAdapter,
			BaseExpandableListAdapter: android.widget.BaseExpandableListAdapter,
			BaseInputConnection: android.view.inputmethod.BaseInputConnection,
			BaseKeyListener: android.text.method.BaseKeyListener,
			BaseMovementMethod: android.text.method.BaseMovementMethod,
			BassBoost: android.media.audiofx.BassBoost,
			BidiFormatter: android.text.BidiFormatter,
			Bitmap: android.graphics.Bitmap,
			BitmapDrawable: android.graphics.drawable.BitmapDrawable,
			BitmapFactory: android.graphics.BitmapFactory,
			BitmapRegionDecoder: android.graphics.BitmapRegionDecoder,
			BitmapShader: android.graphics.BitmapShader,
			BlurMaskFilter: android.graphics.BlurMaskFilter,
			BoringLayout: android.text.BoringLayout,
			BounceInterpolator: android.view.animation.BounceInterpolator,
			BulletSpan: android.text.style.BulletSpan,
			Button: android.widget.Button,
			CalendarView: android.widget.CalendarView,
			CamcorderProfile: android.media.CamcorderProfile,
			Camera: android.graphics.Camera,
			CameraProfile: android.media.CameraProfile,
			Canvas: android.graphics.Canvas,
			CharacterPickerDialog: android.text.method.CharacterPickerDialog,
			CharacterStyle: android.text.style.CharacterStyle,
			Checkable: android.widget.Checkable,
			CheckBox: android.widget.CheckBox,
			CheckedTextView: android.widget.CheckedTextView,
			Choreographer: android.view.Choreographer,
			Chronometer: android.widget.Chronometer,
			ClickableSpan: android.text.style.ClickableSpan,
			ClipboardManager: android.text.ClipboardManager,
			ClipDrawable: android.graphics.drawable.ClipDrawable,
			CollapsibleActionView: android.view.CollapsibleActionView,
			Color: android.graphics.Color,
			ColorDrawable: android.graphics.drawable.ColorDrawable,
			ColorFilter: android.graphics.ColorFilter,
			ColorMatrix: android.graphics.ColorMatrix,
			ColorMatrixColorFilter: android.graphics.ColorMatrixColorFilter,
			ColorStateList: android.content.res.ColorStateList,
			CompletionInfo: android.view.inputmethod.CompletionInfo,
			ComposePathEffect: android.graphics.ComposePathEffect,
			ComposeShader: android.graphics.ComposeShader,
			CompoundButton: android.widget.CompoundButton,
			Context: android.content.Context,
			ContextMenu: android.view.ContextMenu,
			ContextThemeWrapper: android.view.ContextThemeWrapper,
			CornerPathEffect: android.graphics.CornerPathEffect,
			CorrectionInfo: android.view.inputmethod.CorrectionInfo,
			CursorAdapter: android.widget.CursorAdapter,
			CursorTreeAdapter: android.widget.CursorTreeAdapter,
			CycleInterpolator: android.view.animation.CycleInterpolator,
			DashPathEffect: android.graphics.DashPathEffect,
			DateKeyListener: android.text.method.DateKeyListener,
			DatePicker: android.widget.DatePicker,
			DateTimeKeyListener: android.text.method.DateTimeKeyListener,
			DecelerateInterpolator: android.view.animation.DecelerateInterpolator,
			DialerFilter: android.widget.DialerFilter,
			DialerKeyListener: android.text.method.DialerKeyListener,
			DialogInterface: android.content.DialogInterface,
			DigitalClock: android.widget.DigitalClock,
			DigitsKeyListener: android.text.method.DigitsKeyListener,
			DiscretePathEffect: android.graphics.DiscretePathEffect,
			Display: android.view.Display,
			DragEvent: android.view.DragEvent,
			Drawable: android.graphics.drawable.Drawable,
			DrawableContainer: android.graphics.drawable.DrawableContainer,
			DrawableMarginSpan: android.text.style.DrawableMarginSpan,
			DrawFilter: android.graphics.DrawFilter,
			DynamicDrawableSpan: android.text.style.DynamicDrawableSpan,
			DynamicLayout: android.text.DynamicLayout,
			EasyEditSpan: android.text.style.EasyEditSpan,
			EdgeEffect: android.widget.EdgeEffect,
			Editable: android.text.Editable,
			EditorInfo: android.view.inputmethod.EditorInfo,
			EditText: android.widget.EditText,
			EmbossMaskFilter: android.graphics.EmbossMaskFilter,
			EnvironmentalReverb: android.media.audiofx.EnvironmentalReverb,
			Equalizer: android.media.audiofx.Equalizer,
			ExifInterface: android.media.ExifInterface,
			ExpandableListAdapter: android.widget.ExpandableListAdapter,
			ExpandableListView: android.widget.ExpandableListView,
			ExtractedText: android.view.inputmethod.ExtractedText,
			ExtractedTextRequest: android.view.inputmethod.ExtractedTextRequest,
			FaceDetector: android.media.FaceDetector,
			Filter: android.widget.Filter,
			Filterable: android.widget.Filterable,
			FilterQueryProvider: android.widget.FilterQueryProvider,
			FloatEvaluator: android.animation.FloatEvaluator,
			FocusFinder: android.view.FocusFinder,
			ForegroundColorSpan: android.text.style.ForegroundColorSpan,
			FrameLayout: android.widget.FrameLayout,
			Gallery: android.widget.Gallery,
			GestureDetector: android.view.GestureDetector,
			GetChars: android.text.GetChars,
			GradientDrawable: android.graphics.drawable.GradientDrawable,
			Gravity: android.view.Gravity,
			GridLayout: android.widget.GridLayout,
			GridLayoutAnimationController: android.view.animation.GridLayoutAnimationController,
			GridView: android.widget.GridView,
			HapticFeedbackConstants: android.view.HapticFeedbackConstants,
			HeaderViewListAdapter: android.widget.HeaderViewListAdapter,
			HeterogeneousExpandableList: android.widget.HeterogeneousExpandableList,
			HideReturnsTransformationMethod: android.text.method.HideReturnsTransformationMethod,
			HorizontalScrollView: android.widget.HorizontalScrollView,
			Html: android.text.Html,
			IconMarginSpan: android.text.style.IconMarginSpan,
			Image: android.media.Image,
			ImageButton: android.widget.ImageButton,
			ImageFormat: android.graphics.ImageFormat,
			ImageReader: android.media.ImageReader,
			ImageSpan: android.text.style.ImageSpan,
			ImageSwitcher: android.widget.ImageSwitcher,
			ImageView: android.widget.ImageView,
			InputBinding: android.view.inputmethod.InputBinding,
			InputConnection: android.view.inputmethod.InputConnection,
			InputConnectionWrapper: android.view.inputmethod.InputConnectionWrapper,
			InputDevice: android.view.InputDevice,
			InputEvent: android.view.InputEvent,
			InputFilter: android.text.InputFilter,
			InputMethod: android.view.inputmethod.InputMethod,
			InputMethodInfo: android.view.inputmethod.InputMethodInfo,
			InputMethodManager: android.view.inputmethod.InputMethodManager,
			InputMethodSession: android.view.inputmethod.InputMethodSession,
			InputMethodSubtype: android.view.inputmethod.InputMethodSubtype,
			InputQueue: android.view.InputQueue,
			InputType: android.text.InputType,
			InsetDrawable: android.graphics.drawable.InsetDrawable,
			Intent: android.content.Intent,
			Interpolator: android.graphics.Interpolator,
			IntEvaluator: android.animation.IntEvaluator,
			JetPlayer: android.media.JetPlayer,
			KeyCharacterMap: android.view.KeyCharacterMap,
			KeyEvent: android.view.KeyEvent,
			Keyframe: android.animation.Keyframe,
			KeyListener: android.text.method.KeyListener,
			LayerDrawable: android.graphics.drawable.LayerDrawable,
			LayerRasterizer: android.graphics.LayerRasterizer,
			Layout: android.text.Layout,
			LayoutAnimationController: android.view.animation.LayoutAnimationController,
			LayoutDirection: android.util.LayoutDirection,
			LayoutInflater: android.view.LayoutInflater,
			LayoutTransition: android.animation.LayoutTransition,
			LeadingMarginSpan: android.text.style.LeadingMarginSpan,
			LevelListDrawable: android.graphics.drawable.LevelListDrawable,
			LightingColorFilter: android.graphics.LightingColorFilter,
			LinearGradient: android.graphics.LinearGradient,
			LinearInterpolator: android.view.animation.LinearInterpolator,
			LinearLayout: android.widget.LinearLayout,
			LineBackgroundSpan: android.text.style.LineBackgroundSpan,
			LineHeightSpan: android.text.style.LineHeightSpan,
			LinkMovementMethod: android.text.method.LinkMovementMethod,
			ListAdapter: android.widget.ListAdapter,
			ListPopupWindow: android.widget.ListPopupWindow,
			ListView: android.widget.ListView,
			LocaleSpan: android.text.style.LocaleSpan,
			LoginFilter: android.text.LoginFilter,
			LoudnessEnhancer: android.media.audiofx.LoudnessEnhancer,
			MaskFilter: android.graphics.MaskFilter,
			MaskFilterSpan: android.text.style.MaskFilterSpan,
			Matrix: android.graphics.Matrix,
			MediaActionSound: android.media.MediaActionSound,
			MediaCodec: android.media.MediaCodec,
			MediaCodecInfo: android.media.MediaCodecInfo,
			MediaCodecList: android.media.MediaCodecList,
			MediaController: android.widget.MediaController,
			MediaCrypto: android.media.MediaCrypto,
			MediaDrm: android.media.MediaDrm,
			MediaExtractor: android.media.MediaExtractor,
			MediaFormat: android.media.MediaFormat,
			MediaMetadataEditor: android.media.MediaMetadataEditor,
			MediaMetadataRetriever: android.media.MediaMetadataRetriever,
			MediaMuxer: android.media.MediaMuxer,
			MediaPlayer: android.media.MediaPlayer,
			MediaRecorder: android.media.MediaRecorder,
			MediaRouter: android.media.MediaRouter,
			MediaScannerConnection: android.media.MediaScannerConnection,
			MediaSyncEvent: android.media.MediaSyncEvent,
			Menu: android.view.Menu,
			MenuInflater: android.view.MenuInflater,
			MenuItem: android.view.MenuItem,
			MetaKeyKeyListener: android.text.method.MetaKeyKeyListener,
			MetricAffectingSpan: android.text.style.MetricAffectingSpan,
			MotionEvent: android.view.MotionEvent,
			MovementMethod: android.text.method.MovementMethod,
			Movie: android.graphics.Movie,
			MultiAutoCompleteTextView: android.widget.MultiAutoCompleteTextView,
			MultiTapKeyListener: android.text.method.MultiTapKeyListener,
			NinePatch: android.graphics.NinePatch,
			NinePatchDrawable: android.graphics.drawable.NinePatchDrawable,
			NoCopySpan: android.text.NoCopySpan,
			NoiseSuppressor: android.media.audiofx.NoiseSuppressor,
			NumberKeyListener: android.text.method.NumberKeyListener,
			NumberPicker: android.widget.NumberPicker,
			ObjectAnimator: android.animation.ObjectAnimator,
			OrientationEventListener: android.view.OrientationEventListener,
			OrientationListener: android.view.OrientationListener,
			OvalShape: android.graphics.drawable.shapes.OvalShape,
			OvershootInterpolator: android.view.animation.OvershootInterpolator,
			OverScroller: android.widget.OverScroller,
			Paint: android.graphics.Paint,
			PaintDrawable: android.graphics.drawable.PaintDrawable,
			PaintFlagsDrawFilter: android.graphics.PaintFlagsDrawFilter,
			ParagraphStyle: android.text.style.ParagraphStyle,
			ParcelableSpan: android.text.ParcelableSpan,
			PasswordTransformationMethod: android.text.method.PasswordTransformationMethod,
			Path: android.graphics.Path,
			PathDashPathEffect: android.graphics.PathDashPathEffect,
			PathEffect: android.graphics.PathEffect,
			PathMeasure: android.graphics.PathMeasure,
			PathShape: android.graphics.drawable.shapes.PathShape,
			Picture: android.graphics.Picture,
			PictureDrawable: android.graphics.drawable.PictureDrawable,
			PixelFormat: android.graphics.PixelFormat,
			PixelXorXfermode: android.graphics.PixelXorXfermode,
			Point: android.graphics.Point,
			PointF: android.graphics.PointF,
			PopupMenu: android.widget.PopupMenu,
			PopupWindow: android.widget.PopupWindow,
			PorterDuff: android.graphics.PorterDuff,
			PorterDuffColorFilter: android.graphics.PorterDuffColorFilter,
			PorterDuffXfermode: android.graphics.PorterDuffXfermode,
			PresetReverb: android.media.audiofx.PresetReverb,
			ProgressBar: android.widget.ProgressBar,
			PropertyValuesHolder: android.animation.PropertyValuesHolder,
			QuickContactBadge: android.widget.QuickContactBadge,
			QuoteSpan: android.text.style.QuoteSpan,
			QwertyKeyListener: android.text.method.QwertyKeyListener,
			RadialGradient: android.graphics.RadialGradient,
			RadioButton: android.widget.RadioButton,
			RadioGroup: android.widget.RadioGroup,
			Rasterizer: android.graphics.Rasterizer,
			RasterizerSpan: android.text.style.RasterizerSpan,
			Rating: android.media.Rating,
			RatingBar: android.widget.RatingBar,
			Rect: android.graphics.Rect,
			RectEvaluator: android.animation.RectEvaluator,
			RectF: android.graphics.RectF,
			RectShape: android.graphics.drawable.shapes.RectShape,
			Region: android.graphics.Region,
			RegionIterator: android.graphics.RegionIterator,
			RelativeLayout: android.widget.RelativeLayout,
			RelativeSizeSpan: android.text.style.RelativeSizeSpan,
			RemoteControlClient: android.media.RemoteControlClient,
			RemoteController: android.media.RemoteController,
			RemoteViews: android.widget.RemoteViews,
			RemoteViewsService: android.widget.RemoteViewsService,
			ReplacementSpan: android.text.style.ReplacementSpan,
			ReplacementTransformationMethod: android.text.method.ReplacementTransformationMethod,
			ResourceCursorAdapter: android.widget.ResourceCursorAdapter,
			ResourceCursorTreeAdapter: android.widget.ResourceCursorTreeAdapter,
			Ringtone: android.media.Ringtone,
			RippleDrawable: android.graphics.drawable.RippleDrawable,
			RingtoneManager: android.media.RingtoneManager,
			RotateAnimation: android.view.animation.RotateAnimation,
			RotateDrawable: android.graphics.drawable.RotateDrawable,
			RoundRectShape: android.graphics.drawable.shapes.RoundRectShape,
			ScaleAnimation: android.view.animation.ScaleAnimation,
			ScaleDrawable: android.graphics.drawable.ScaleDrawable,
			ScaleGestureDetector: android.view.ScaleGestureDetector,
			ScaleXSpan: android.text.style.ScaleXSpan,
			Scroller: android.widget.Scroller,
			ScrollingMovementMethod: android.text.method.ScrollingMovementMethod,
			ScrollView: android.widget.ScrollView,
			SearchView: android.widget.SearchView,
			SectionIndexer: android.widget.SectionIndexer,
			SeekBar: android.widget.SeekBar,
			Selection: android.text.Selection,
			Shader: android.graphics.Shader,
			Shape: android.graphics.drawable.shapes.Shape,
			ShapeDrawable: android.graphics.drawable.ShapeDrawable,
			ShareActionProvider: android.widget.ShareActionProvider,
			SimpleAdapter: android.widget.SimpleAdapter,
			SimpleCursorAdapter: android.widget.SimpleCursorAdapter,
			SimpleCursorTreeAdapter: android.widget.SimpleCursorTreeAdapter,
			SimpleExpandableListAdapter: android.widget.SimpleExpandableListAdapter,
			SingleLineTransformationMethod: android.text.method.SingleLineTransformationMethod,
			SlidingDrawer: android.widget.SlidingDrawer,
			SoundEffectConstants: android.view.SoundEffectConstants,
			SoundPool: android.media.SoundPool,
			Space: android.widget.Space,
			Spannable: android.text.Spannable,
			SpannableString: android.text.SpannableString,
			SpannableStringBuilder: android.text.SpannableStringBuilder,
			Spanned: android.text.Spanned,
			SpannedString: android.text.SpannedString,
			SpanWatcher: android.text.SpanWatcher,
			Spinner: android.widget.Spinner,
			SpinnerAdapter: android.widget.SpinnerAdapter,
			StackView: android.widget.StackView,
			StateListDrawable: android.graphics.drawable.StateListDrawable,
			StaticLayout: android.text.StaticLayout,
			StrikethroughSpan: android.text.style.StrikethroughSpan,
			StyleSpan: android.text.style.StyleSpan,
			SubMenu: android.view.SubMenu,
			SubscriptSpan: android.text.style.SubscriptSpan,
			SuggestionSpan: android.text.style.SuggestionSpan,
			SumPathEffect: android.graphics.SumPathEffect,
			SuperscriptSpan: android.text.style.SuperscriptSpan,
			Surface: android.view.Surface,
			SurfaceHolder: android.view.SurfaceHolder,
			SurfaceTexture: android.graphics.SurfaceTexture,
			SurfaceView: android.view.SurfaceView,
			SweepGradient: android.graphics.SweepGradient,
			Switch: android.widget.Switch,
			TabHost: android.widget.TabHost,
			TableLayout: android.widget.TableLayout,
			TableRow: android.widget.TableRow,
			TabStopSpan: android.text.style.TabStopSpan,
			TabWidget: android.widget.TabWidget,
			TextAppearanceSpan: android.text.style.TextAppearanceSpan,
			TextClock: android.widget.TextClock,
			TextDirectionHeuristic: android.text.TextDirectionHeuristic,
			TextDirectionHeuristics: android.text.TextDirectionHeuristics,
			TextKeyListener: android.text.method.TextKeyListener,
			TextPaint: android.text.TextPaint,
			TextSwitcher: android.widget.TextSwitcher,
			TextureView: android.view.TextureView,
			TextUtils: android.text.TextUtils,
			TextView: android.widget.TextView,
			TextWatcher: android.text.TextWatcher,
			ThumbnailUtils: android.media.ThumbnailUtils,
			TimeAnimator: android.animation.TimeAnimator,
			TimedText: android.media.TimedText,
			TimeInterpolator: android.animation.TimeInterpolator,
			TimeKeyListener: android.text.method.TimeKeyListener,
			TimePicker: android.widget.TimePicker,
			Toast: android.widget.Toast,
			ToggleButton: android.widget.ToggleButton,
			ToneGenerator: android.media.ToneGenerator,
			Touch: android.text.method.Touch,
			TouchDelegate: android.view.TouchDelegate,
			Transformation: android.view.animation.Transformation,
			TransformationMethod: android.text.method.TransformationMethod,
			TransitionDrawable: android.graphics.drawable.TransitionDrawable,
			TranslateAnimation: android.view.animation.TranslateAnimation,
			TwoLineListItem: android.widget.TwoLineListItem,
			TypeEvaluator: android.animation.TypeEvaluator,
			Typeface: android.graphics.Typeface,
			TypefaceSpan: android.text.style.TypefaceSpan,
			UnderlineSpan: android.text.style.UnderlineSpan,
			UpdateAppearance: android.text.style.UpdateAppearance,
			UpdateLayout: android.text.style.UpdateLayout,
			Uri: android.net.Uri,
			URLSpan: android.text.style.URLSpan,
			ValueAnimator: android.animation.ValueAnimator,
			VelocityTracker: android.view.VelocityTracker,
			VideoView: android.widget.VideoView,
			View: android.view.View,
			ViewAnimator: android.widget.ViewAnimator,
			ViewAnimationUtils: android.view.ViewAnimationUtils,
			ViewConfiguration: android.view.ViewConfiguration,
			ViewDebug: android.view.ViewDebug,
			ViewFlipper: android.widget.ViewFlipper,
			ViewGroup: android.view.ViewGroup,
			ViewGroupOverlay: android.view.ViewGroupOverlay,
			ViewManager: android.view.ViewManager,
			ViewOverlay: android.view.ViewOverlay,
			ViewParent: android.view.ViewParent,
			ViewPropertyAnimator: android.view.ViewPropertyAnimator,
			ViewStub: android.view.ViewStub,
			ViewSwitcher: android.widget.ViewSwitcher,
			ViewTreeObserver: android.view.ViewTreeObserver,
			Virtualizer: android.media.audiofx.Virtualizer,
			Visualizer: android.media.audiofx.Visualizer,
			WebSettings: android.webkit.WebSettings,
			WebView: android.webkit.WebView,
			Window: android.view.Window,
			WindowId: android.view.WindowId,
			WindowManager: android.view.WindowManager,
			WrapperListAdapter: android.widget.WrapperListAdapter,
			WrapTogetherSpan: android.text.style.WrapTogetherSpan,
			Xfermode: android.graphics.Xfermode,
			Xml: android.util.Xml,
			YuvImage: android.graphics.YuvImage,
			ZoomButton: android.widget.ZoomButton,
			ZoomButtonsController: android.widget.ZoomButtonsController,
			ZoomControls: android.widget.ZoomControls,
			ui: function(func) {
				ctx.runOnUiThread(new java.lang.Runnable({
					run: func,
				}));

			},
			th: function(func) {
				var thn = new java.lang.Runnable({
					run: func,
				});
				return new java.lang.Thread(thn);
			}
		}

		G.initialize();

		ConsoleEmulator = {
			logStack: [],
			LogType: {
				ERROR: 1 + 23,
				WARNING: 2 + 23,
				OUTPUT: 3 + 23,
				EVALUATE: 4 + 23,
				CONSOLE_MSG: 9 + 23,
			},
			logPushListener: null,
			setLogPushListener: function(listener) {
				if (typeof(listener) == "function") {
					this.logPushListener = listener;
				}
			},
			log: function s(type, module, msg, args) {
				this.limitLogNum();
				if(!DataCollector.S_CONFIG.log && type != this.LogType.CONSOLE_MSG) return;
				this.logStack.push(s.log = {
					type: type,
					module: module,
					msg: String(msg),
					detail: (function(c) {
						var r = [];
						for (var i in c) {
							r.push(c[i]);
						}
						if (r.length) return r;
						else return null;
					}(args)),
					time: (new Date()).getTime()
				});
				if (this.logPushListener) this.logPushListener(s.log);
			},
			clearLog: function() {
				this.logStack.length = 0;
			},
			limitLogNum: function() {
				if (this.logStack.length > (DataCollector.S_CONFIG.maxLogStack - 1)) {
					this.logStack.shift();
					this.limitLogNum();
				}
			},
			Evaluator: {
				State: {
					NEW: (5 + 23),
					RUNNING: (6 + 23),
					FINISHED: (7 + 23),
					ERROR: (8 + 23),
				},
				evalPushListener: null,
				setEvaluateCompleteListener: function(listener) {
					if (typeof(listener) == "function") {
						this.evaluateCompleteListener = listener;
					}
				},
				getEvaluationLog: function(pid) {
					for (var i in ConsoleEmulator.logStack) {
						if (ConsoleEmulator.logStack[i].pid == pid) {
							return ConsoleEmulator.logStack[i];
						}
					}
					return {};
				},
				getLogStackIndex: function(pid) {
					for (var i in ConsoleEmulator.logStack) {
						if (ConsoleEmulator.logStack[i].pid == pid) {
							return i;
						}
					}
					return -1;
				},
				generateProcressId: function() {
					var pid, random = function() {
						return 10000 + Math.round(9999 * Math.random());
					}
					while (JSON.stringify(this.getEvaluationLog(pid = random())) == "{}") {
						return pid;
					}
				},

				checkThread: function() {
					for (var i in ConsoleEmulator.logStack) {
						if (java.lang.Thread.currentThread() == ConsoleEmulator.logStack[i].thread) {
							return new org.mozilla.javascript.EvaluatorException("You can't call function \"ConsoleEmulator.Evaluator.evaluate\"  in the console.");
						}
					}
					return true;
				},

				evaluate: function s(cmd) {
					ConsoleEmulator.logStack.push(s.log = {
						pid: s.pid = this.generateProcressId(),
						cmd: String(cmd),
						type: ConsoleEmulator.LogType.EVALUATE,
						state: ConsoleEmulator.Evaluator.State.NEW,
						thread: new java.lang.Thread(new java.lang.Runnable({
							run: function() {
								var index = ConsoleEmulator.Evaluator.getLogStackIndex(s.pid);
								try {
									ConsoleEmulator.logStack[index].r_msg = ConsoleEmulator.toSource(eval.call(null, String(cmd)));
									ConsoleEmulator.logStack[index].state = ConsoleEmulator.Evaluator.State.FINISHED;
								} catch (error) {
									ConsoleEmulator.logStack[index].r_msg = ConsoleEmulator.traceErrorStack(error);
									ConsoleEmulator.logStack[index].state = ConsoleEmulator.Evaluator.State.ERROR;
								}
								ConsoleEmulator.logStack[index].thread = null;
								ConsoleEmulator.logStack[index].ms = (new Date()).getTime() - ConsoleEmulator.logStack[index].time;
								if (ConsoleEmulator.Evaluator.evaluateCompleteListener) ConsoleEmulator.Evaluator.evaluateCompleteListener(ConsoleEmulator.logStack[index]);
							},
						})),
						r_msg: "",
						time: (new Date()).getTime(),
						ms: null,
					});
					if (ConsoleEmulator.logPushListener) ConsoleEmulator.logPushListener(s.log);
					s.index = this.getLogStackIndex(s.pid);
					if ((s.status = this.checkThread()) == true) {
						ConsoleEmulator.logStack[s.index].thread.start();
						ConsoleEmulator.logStack[s.index].state = ConsoleEmulator.Evaluator.State.RUNNING;
					} else {
						ConsoleEmulator.logStack[index].r_msg = ConsoleEmulator.traceErrorStack(s.status);
						ConsoleEmulator.logStack[index].state = ConsoleEmulator.Evaluator.State.ERROR;
						ConsoleEmulator.logStack[index].thread = null;
						ConsoleEmulator.logStack[index].ms = null;
						if (ConsoleEmulator.Evaluator.evaluateCompleteListener) ConsoleEmulator.Evaluator.evaluateCompleteListener(ConsoleEmulator.logStack[index]);
					}
				},

				forceKillThread: function(pid) {
					var index = ConsoleEmulator.Evaluator.getLogStackIndex(pid);
					if (!ConsoleEmulator.logStack[index]) return;
					//interruput the thread
					if (ConsoleEmulator.logStack[index].thread.getState() == (java.lang.Thread.State.RUNNABLE ||
							java.lang.Thread.State.BLOCKED)) {
						ConsoleEmulator.logStack[index].thread.join(1);
						ConsoleEmulator.logStack[index].thread.interrupt();
						ConsoleEmulator.logStack[index].thread.yield();
						ConsoleEmulator.logStack[index].r_msg = "Procress Canceled.";
						ConsoleEmulator.logStack[index].state = ConsoleEmulator.Evaluator.State.FINISHED;
						ConsoleEmulator.logStack[index].thread = null;
						ConsoleEmulator.logStack[index].ms = null;
						if (this.evaluateCompleteListener) this.evaluateCompleteListener(ConsoleEmulator.logStack[index]);
					} else {

					}
				}

			},
			deleteListener: function() {
				this.Evaluator.evaluateCompleteListener = null;
				this.logPushListener = null;
			},
			traceErrorStack: function(error) {
				var throwable = new java.lang.Throwable(error);
				var stack = throwable.getStackTrace();
				var string = new java.lang.StringBuilder();
				string.append(error + "\n" + error.stack);
				var i = 0;
				while (i < (stack.length < 10 ? stack.length : 10)) {
					string.append("\nat " + stack[i].getClassName());
					string.append("." + stack[i].getMethodName());
					string.append("(" + stack[i].getFileName());
					string.append(":" + stack[i].getLineNumber());
					string.append(")");
					i++
				}
				if (stack.length > 10) string.append("\n..." + (stack.length - i - 1) + " more");
				return String(string.toString());
			},
			//function:toSource from CommandAssistant@projectXero
			//Origin: CommandAssistant@MapScript.toSource(Object obj);
			//See: https://gitee.com/projectxero/ca/
			toSource: function(obj) {
				var strtok = ["\\\\", "\\n", "\\t", /*"\\b",*/ "\\r", "\\f", "\\\"", "\\\'"];
				var _toJSON = function toJSON(x, lev) {
					var p = "",
						r, i;
					if (lev < 0) return String(x);
					if (typeof x == "string") {
						//for (i = 0; i < strtok.length; i++) x = x.replace(new RegExp(strtok[i], "g"), strtok[i]);
						return x;
					} else if (Array.isArray(x)) {
						r = new Array();
						for (i = 0; i < x.length; i++) r.push(toJSON(x[i], lev - 1));
						p = "[" + r.join(",") + "]";
					} else if (x instanceof Error) {
						p = "new Error(" + toJSON(x.message) + ")";
					} else if (x instanceof RegExp) {
						p = x.toString();
					} else if (x instanceof Date) {
						p = "new Date(" + x.getTime() + ")";
					} else if (x instanceof Function) {
						p = x.toString();
					} else if (x instanceof Object) {
						r = new Array();
						for (i in x) r.push(toJSON(i, lev) + ":" + toJSON(x[i], lev - 1));
						p = "{" + r.join(",") + "}";
					} else if (x instanceof java.lang.CharSequence) {
						p = _toJSON(String(x), lev);
					} else {
						p = String(x);
					}
					return p;
				}
				return _toJSON(obj, 32);
			},
		};


		GUI = {
			module: "GraphicsUserInterface",
			Configuration: {
				lTextSize: G.dp * 8,
				mTextSize: G.dp * 6,
				sTextSize: G.dp * 5,
				typeface: new G.Typeface.create(G.Typeface.DEFAULT, G.Typeface.NORMAL),
				AnimType: {
					ALPHA: "alpha",
					SCALEX: "scaleX",
					SCALEY: "scaleY",
					TRANSLATIONX: "translationX",
					TRANSLATIONY: "translationY",
					ROTATION: "rotation",
				},
				width: (G.width > G.height) ? G.height : G.width,
				height: G.height,
				DisplayMode: {
					SHOW: (100 + 2),
					GOTO: (100 + 1),
				},
				FadeInAnimType: {
					circular: (233 + 1),
					alpha: (233 + 2),
				},
				defaultWindow: "GetStart",

				DISPLAY_TYPE: (function() {
					return (host == (Host.AUTOJS_UI || Host.AUTOJS_NONUI)) ? (android.os.Build.VERSION.SDK_INT >= 26 ? G.WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY : G.WindowManager.LayoutParams.TYPE_PHONE) : G.WindowManager.LayoutParams.TYPE_APPLICATION_PANEL;
				}()),

			},

			Widget: {
				//附属控件
				Button: function(width, height, text) {
					var main = new G.Button(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.setText(String(text));
					main.setTextSize(GUI.Configuration.mTextSize);
					main.setTypeface(GUI.Configuration.typeface);
					main.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
					if (arguments[3]) main.setOnClickListener(new G.View.OnClickListener({
						onClick: arguments[3]
					}));
					if (arguments[4]) main.setOnLongClickListener(new G.View.OnLongClickListener({
						onLongClick: arguments[4]
					}));
					return main;
				},
				CheckBox: function(width, height, checked) {
					var main = new G.CheckBox(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.getLayoutParams().gravity = G.Gravity.CENTER;
					main.setChecked(checked);
					if (arguments[3]) main.setOnCheckedChangeListener(new G.CompoundButton.OnCheckedChangeListener({
						onCheckedChanged: arguments[3],
					}));
					return main;
				},
				EditText: function(width, height, text, hint) {
					var main = new G.EditText(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.setTypeface(GUI.Configuration.typeface);
					main.setTextSize(GUI.Configuration.mTextSize);
					main.setText(text ? text : "");
					main.setHint(hint ? hint : "");
					main.setTextColor(DataCollector.toTextColor(true));
					main.setHintTextColor(DataCollector.toHintTextColor(true));
					main.setOnLongClickListener(new G.View.OnLongClickListener({
						onLongClick: function self(view) {
							self.nlay = GUI.Widget.LinearLayout(-1, -1, "V");
							self.nlay.setAlpha(DataCollector.S_CONFIG.winalpha);
							self.nlay.setOnClickListener(new G.View.OnClickListener({
								onClick: function(view) {
									self.operate.setEnabled(false);
									GUI.Util.objAnim(self.operate, 200, new G.DecelerateInterpolator(2), [{
										key: GUI.Configuration.AnimType.ALPHA,
										start: 1,
										end: 0
									}], function() {
										self.suspension.dismiss();
									});
								},
							}));
							self.operate = GUI.Widget.LinearLayout(-2, -2, "V");
							self.operate.setBackgroundColor(DataCollector.toDeepThemeColor());
							self.operate.setEnabled(false);
							([{
								name: "复制",
								onClick: function(view) {

									self.dismiss();
								}
							}, {
								name: "全选",
								onClick: function(view) {
									self.dismiss();
								}
							}, {
								name: "粘贴",
								onClick: function(view) {
									var cm = ctx.getSystemService(G.Context.CLIPBOARD_SERVICE);
									var text = cm.getPrimaryClip().getItemAt(0).coerceToText(ctx);
									var index = main.getSelectionStart();
									var edit = main.getEditableText();
									if (index < 0 || index >= edit.length()) {
										edit.append(text);
									} else {
										edit.insert(index, text);
									}
									self.dismiss();
								}
							}]).map(function(element, index) {
								element.view = GUI.Widget.TextView(-2, -2, element.name, element.onClick);
								element.view.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
								element.view.setPadding(G.dp * 30, G.dp * 15, G.dp * 30, G.dp * 15);
								if (G.sdk == 3) element.view.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 50, G.dp * 50, "rect"));
								self.operate.addView(element.view);
							});
							self.location = new java.lang.reflect.Array.newInstance(java.lang.Integer.TYPE, 2);
							main.getLocationOnScreen(self.location);
							self.operate.measure(G.View.MeasureSpec.UNSPECIFIED, G.View.MeasureSpec.UNSPECIFIED);
							self.nlay.addView(self.operate);
							self.suspension = new G.PopupWindow(self.nlay, -1, -1, true);
							self.suspension.setWindowLayoutType(GUI.Configuration.DISPLAY_TYPE);
							self.suspension.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.NO_GRAVITY, 0, 0);
							self.operate.getLayoutParams().setMargins(
								(self.location[0] + main.getWidth() / 2) - self.operate.getMeasuredWidth() / 2,
								(self.location[1] + main.getHeight() / 2), 0, 0);
							if (G.sdk == 3) {
								GUI.Util.circularAnim(self.operate, 400, new G.DecelerateInterpolator(2), function() {
										self.operate.setEnabled(true);
									}, self.location[0] + self.operate.getMeasuredWidth() / 2,
									self.location[1] - self.operate.getMeasuredHeight() / 2);
							} else {
								GUI.Util.objAnim(self.operate, 200, new G.DecelerateInterpolator(2), [{
									key: GUI.Configuration.AnimType.ALPHA,
									start: 0,
									end: 1
								}], function() {
									self.operate.setEnabled(true);
								});
							}

							self.dismiss = function() {
								self.operate.setEnabled(false);
								GUI.Util.objAnim(self.operate, 200, new G.DecelerateInterpolator(2), [{
									key: GUI.Configuration.AnimType.ALPHA,
									start: 1,
									end: 0
								}], function() {
									self.suspension.dismiss();
								});
							}
							return true;
						},
					}));
					if (arguments[4]) main.setOnTouchListener(new G.View.OnTouchListener({
						onTouch: arguments[4],
					}));
					if (arguments[5]) main.addTextChangedListener(new G.TextWatcher({
						afterTextChangted: function(string) {},
						beforeTextChanged: function(string, start, count, after) {},
						onTextChanged: arguments[5]
					}));

					return main;
				},
				TextView: function(width, height, text) {
					var main = new G.TextView(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.setTypeface(GUI.Configuration.typeface);
					main.setTextSize(GUI.Configuration.mTextSize);
					main.setText(text ? text : "");
					main.setTextColor(DataCollector.toTextColor(true));
					if (arguments[3]) main.setOnClickListener(new G.View.OnClickListener({
						onClick: arguments[3]
					}));
					return main;
				},
				ProgressBar: function(width, height, style, indeterminate, color) {
					var main = G.ProgressBar(ctx, null, android.R.attr[style]);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.setIndeterminate(indeterminate);
					if (color) main.setProgressDrawable(new G.ColorDrawable(color));
					return main;
				},
				SeekBar: function(width, height, seekEnv, stopEnv) {
					var main = G.SeekBar(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.setOnSeekBarChangeListener(new G.SeekBar.OnSeekBarChangeListener({
						onProgressChanged: seekEnv,
						onStopTrackingTouch: stopEnv,
					}));
					return main;
				},
				LinearLayout: function(width, height, orientation) {
					var main = new G.LinearLayout(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					if (orientation == "V") {
						main.setOrientation(G.LinearLayout.VERTICAL);
					} else if (orientation == "H") {
						main.setOrientation(G.LinearLayout.HORIZONTAL);
					}
					if (arguments[3]) main.setOnClickListener(new G.View.OnClickListener({
						onClick: arguments[3]
					}));
					return main;
				},
				ScrollLayout: function(width, height) {
					var main = new G.ScrollView(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					return main;
				},
				RelativeLayout: function(width, height) {
					var main = new G.RelativeLayout(ctx);
					main.setLayoutParams(new G.RelativeLayout.LayoutParams(width, height));
					if (arguments[2]) main.setOnClickListener(new G.View.OnClickListener({
						onClick: arguments[2]
					}));
					return main;
				},
				ImageView: function(width, height, bitmap) {
					var main = new G.ImageView(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					main.setScaleType(G.ImageView.ScaleType.CENTER_CROP);
					if (bitmap) main.setImageBitmap(bitmap);
					if (arguments[3]) main.setOnClickListener(new G.View.OnClickListener({
						onClick: arguments[3]
					}));
					return main;
				},
				View: function(width, height) {
					var main = new G.View(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(width, height));
					if (arguments[2]) main.setOnClickListener(new G.View.OnClickListener({
						onClick: arguments[2]
					}));
					return main;
				},

				//独立控件
				//Commom.showDialog (from@projectXero)
				showDialog: function(layout, width, height, onDismiss, modal, cantExit) {
					var frame, popup, trans;
					frame = new G.FrameLayout(ctx);
					frame.setAlpha(DataCollector.S_CONFIG.winalpha);
					frame.setBackgroundColor(G.Color.argb(0x80, 0, 0, 0));
					frame.setOnTouchListener(new G.View.OnTouchListener({
						onTouch: function touch(v, e) {
							try {
								if (e.getAction() == e.ACTION_DOWN && !modal) {
									GUI.Util.objAnim(frame, 75, new G.LinearInterpolator(), [{
										key: GUI.Configuration.AnimType.ALPHA,
										start: 1,
										end: 0
									}], function() {
										frame.setAlpha(0);
										popup.dismiss();
									});
								}
								return true;
							} catch (e) {
								return e.stack, true
							}
						}
					}));
					layout.setLayoutParams(new G.FrameLayout.LayoutParams(width, height, G.Gravity.CENTER));
					layout.getLayoutParams().setMargins(20 * G.dp, 20 * G.dp, 20 * G.dp, 20 * G.dp);
					layout.setOnClickListener(new G.View.OnClickListener({
						onClick: function touch(v, e) {
							try {
								return true;
							} catch (e) {
								return true;
							}
						}
					}));
					layout.setAlpha(DataCollector.S_CONFIG.winalpha);
					frame.addView(layout);
					GUI.Util.objAnim(frame, 75, new G.LinearInterpolator(), [{
						key: GUI.Configuration.AnimType.ALPHA,
						start: 0,
						end: 1
					}]);
					if (G.sdk >= 2) layout.setElevation(16 * G.dp);
					popup = new G.PopupWindow(frame, -1, -1);
					popup.setFocusable(cantExit ? false : true);
					popup.setWindowLayoutType(GUI.Configuration.DISPLAY_TYPE);
					if (onDismiss) popup.setOnDismissListener(new G.PopupWindow.OnDismissListener({
						onDismiss: function() {
							try {
								onDismiss();
							} catch (e) {
								ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "PopupWindow.Window." + current.name, (function(sarg) {
									var arr = [];
									arr.push(ConsoleEmulator.traceErrorStack(e));
									for (var i in sarg) {
										arr.push(sarg[i])
									};
									return arr;
								}(arguments)));
							}
						}
					}));
					popup.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.CENTER, 0, 0);
					return [frame, popup];
				}, //Common.showTextDialog (from@projectXero)
				showTextDialog: function(s, onDismiss, cantExit) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "Widget.showTextDialog", arguments);
					G.ui(function() {
						try {
							var layout, scr, text, exit, dialog;
							layout = new G.LinearLayout(ctx);
							layout.setOrientation(G.LinearLayout.VERTICAL);
							layout.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
							layout.setBackgroundColor(DataCollector.toThemeColor());
							scr = new G.ScrollView(ctx);
							scr.setLayoutParams(new G.LinearLayout.LayoutParams(-2, 0, 1));
							text = new G.TextView(ctx);
							text.setLayoutParams(new G.FrameLayout.LayoutParams(-2, -2));
							text.setText(s);
							text.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, G.dp * 5);
							text.setMovementMethod(G.LinkMovementMethod.getInstance());
							text.setTextSize(GUI.Configuration.sTextSize);
							text.setTextColor(DataCollector.toTextColor(true));
							scr.addView(text);
							layout.addView(scr);
							exit = new G.TextView(ctx);
							exit.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
							if (G.sdk == 3) exit.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 200, G.dp * 100, "rect"));
							exit.setText("关闭");
							exit.setGravity(G.Gravity.CENTER);
							exit.setPadding(5 * G.dp, 10 * G.dp, 5 * G.dp, 10 * G.dp);
							exit.setTextSize(GUI.Configuration.mTextSize);
							exit.setTextColor(DataCollector.toTextColor(true));
							exit.setOnClickListener(new G.View.OnClickListener({
								onClick: function(v) {
									try {
										GUI.Util.objAnim(dialog[0], 75, new G.LinearInterpolator(), [{
											key: GUI.Configuration.AnimType.ALPHA,
											start: 1,
											end: 0
										}], function() {
											dialog[0].setAlpha(0);
											dialog[1].dismiss();
										});
									} catch (e) {
										ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showTextDialog$exit.onClick", (function(sarg) {
											var arr = [];
											arr.push(ConsoleEmulator.traceErrorStack(e));
											for (var i in sarg) {
												arr.push(sarg[i])
											};
											return arr;
										}(arguments)));
									}
								}
							}));
							layout.addView(exit);
							dialog = GUI.Widget.showDialog(layout, -2, -2, onDismiss, true, cantExit);
						} catch (e) {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showTextDialog", (function(sarg) {
								var arr = [];
								arr.push(ConsoleEmulator.traceErrorStack(e));
								for (var i in sarg) {
									arr.push(sarg[i])
								};
								return arr;
							}(arguments)));
						}
					})
				}, //Common.showProgressDialog (from@projectXero)
				showOperateDialog: function self(s, tag, onDismiss) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "Widget.showOperateDialog", arguments);
					G.ui(function() {
						try {
							var frame, list, dialog;
							if (!self.adapter) {
								self.adapter = function(e) {
									e.view = new G.LinearLayout(ctx);
									e.view.setOrientation(G.LinearLayout.VERTICAL);
									e.view.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 15 * G.dp);
									e.view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
									e._title = new G.TextView(ctx);
									e._title.setText(String(e.text));
									e._title.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
									e._title.setFocusable(false);
									e._title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
									e._title.setTextSize(GUI.Configuration.mTextSize);
									e._title.setTextColor(DataCollector.toTextColor(true));
									e.view.addView(e._title);
									if (e.description) {
										e._description = new G.TextView(ctx);
										e._description.setText(String(e.description));
										e._description.setPadding(0, 3 * G.dp, 0, 0);
										e._description.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
										e._description.setTextSize(GUI.Configuration.sTextSize);
										e._description.setTextColor(DataCollector.toHintTextColor(true));
										e.view.addView(e._description);
									}
									return e.view;
								}
							}
							frame = new G.FrameLayout(ctx);
							frame.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
							frame.setBackgroundColor(DataCollector.toThemeColor());
							list = new G.ListView(ctx);
							list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2));
							list.setDividerHeight(0);
							list.setAdapter(new GUI.Util.RhinoListAdapter(s, self.adapter));
							list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
								onItemClick: function(parent, view, pos, id) {
									try {
										var e = s[pos];
										if (e.onclick)
											if (!e.onclick(e.button, tag)) GUI.Util.objAnim(dialog[0], 75, new G.LinearInterpolator(), [{
												key: GUI.Configuration.AnimType.ALPHA,
												start: 1,
												end: 0
											}], function() {
												dialog[0].setAlpha(0);
												dialog[1].dismiss();
											});
										return true;
									} catch (e) {
										ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showOperateDialog$list.onItemClick", (function(sarg) {
											var arr = [];
											arr.push(ConsoleEmulator.traceErrorStack(e));
											for (var i in sarg) {
												arr.push(sarg[i])
											};
											return arr;
										}(arguments)));
									}
								}
							}));
							frame.addView(list);
							dialog = GUI.Widget.showDialog(frame, -1, -2, onDismiss);
						} catch (e) {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showOperateDialog", (function(sarg) {
								var arr = [];
								arr.push(ConsoleEmulator.traceErrorStack(e));
								for (var i in sarg) {
									arr.push(sarg[i])
								};
								return arr;
							}(arguments)));
						}
					})
				}, //Commom.showProgressDialog(from@projectXero)
				showProgressDialog: function self(f, onCancel, isNoText, canExit) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "Widget.showProgressDialog", arguments);
					self.init = function(o) {
						G.ui(function() {
							try {
								var layout = o.layout = new G.LinearLayout(ctx);
								layout.setOrientation(G.LinearLayout.VERTICAL);
								layout.setPadding(G.dp * 10, isNoText ? G.dp * 5 : G.dp * 10, G.dp * 10, isNoText ? G.dp * 5 : 0);
								layout.setBackgroundColor(DataCollector.toThemeColor());
								if (!isNoText) {
									var text = o.text = new G.TextView(ctx);
									text.setLayoutParams(new G.FrameLayout.LayoutParams(-2, -2));
									text.setTextColor(DataCollector.toTextColor(true));
									text.setPadding(G.dp * 10, G.dp * 10, G.dp * 10, G.dp * 10);
									layout.addView(text);
								}
								var progress = o.progress = GUI.Widget.ProgressBar(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.WRAP_CONTENT, "progressBarStyleHorizontal", true);
								layout.addView(progress);
								o.popup = GUI.Widget.showDialog(layout, isNoText ? GUI.Configuration.width * .5 : -2, -2, function() {
									if (!o.closed) {
										o.cancelled = true;
										if (typeof o.onCancel == "function") o.onCancel();
									}
									o.closed = true;
								}, !o.onCancel, canExit ? canExit : true)[1];
								GUI.Util.objAnim(layout, 75, new G.LinearInterpolator(), [{
									key: GUI.Configuration.AnimType.ALPHA,
									start: 0,
									end: 1
								}]);
							} catch (e) {
								ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog", (function(sarg) {
									var arr = [];
									arr.push(ConsoleEmulator.traceErrorStack(e));
									for (var i in sarg) {
										arr.push(sarg[i])
									};
									return arr;
								}(arguments)));
							}
						})
					}, self.controller = {
						setText: function(s) {
							if (isNoText) return;
							var o = this;
							G.ui(function() {
								try {
									o.text.setText(s);
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog$setText", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e)
								}
							});
						},
						setIndeterminate: function(b) {
							var o = this;
							G.ui(function() {
								try {
									o.progress.setIndeterminate(b);
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog$setIndeterminate", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e)
								}
							});
						},
						setMax: function(max) {
							var o = this;
							G.ui(function() {
								try {
									o.progress.setMax(max);
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog$setMax", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e)
								}
							});
						},
						setProgress: function(prog) {
							var o = this;
							G.ui(function() {
								try {
									if (!o.progress.isIndeterminate()) {
										o.progress.setProgress(prog, true);
									}
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog$setProgress", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e)
								}
							});
						},
						close: function() {
							var o = this;
							G.ui(function() {
								try {
									if (o.closed) return;
									o.closed = true;
									GUI.Util.objAnim(o.layout, 75, new G.LinearInterpolator(), [{
										key: GUI.Configuration.AnimType.ALPHA,
										start: 1,
										end: 0
									}], function() {
										o.popup.dismiss();
									});
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog$close", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e)
								}
							});
						},
						async: function(f) {
							var o = this;
							var th = new java.lang.Thread(function() {
								try {
									f(o);
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showProgressDialog$async", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e)
								}
								o.close();
							});
							th.start();
						}
					};
					var o = Object.create(self.controller);
					o.onCancel = onCancel;
					self.init(o);
					if (f) o.async(f);
					return o;
				}, //Common.showConfirmDialog (from@ProjectXero)
				showConfirmDialog: function(s) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "Widget.showConfirmDialog", arguments);
					G.ui(function() {
						try {
							var scr, layout, title, text, skip, onClick, dialog;
							scr = new G.ScrollView(ctx);
							scr.setBackgroundColor(DataCollector.toThemeColor());
							layout = new G.LinearLayout(ctx);
							layout.setLayoutParams(new G.FrameLayout.LayoutParams(-2, -2));
							layout.setOrientation(G.LinearLayout.VERTICAL);
							layout.setPadding(15 * G.dp, 15 * G.dp, 15 * G.dp, 5 * G.dp);
							if (s.title) {
								title = new G.TextView(ctx);
								title.setText(s.title);
								title.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
								title.setPadding(0, 0, 0, 10 * G.dp);
								title.setTextColor(DataCollector.toTextColor(true));
								title.setTextSize(GUI.Configuration.mTextSize);
								layout.addView(title);
							}
							if (s.description) {
								text = new G.TextView(ctx);
								text.setText(s.description);
								text.setPadding(0, 0, 0, 10 * G.dp);
								text.setLayoutParams(new G.LinearLayout.LayoutParams(-2, -2));
								text.setTextColor(DataCollector.toTextColor(true));
								text.setTextSize(GUI.Configuration.sTextSize);
								layout.addView(text);
							}
							if (s.skip) {
								skip = new G.CheckBox(ctx);
								skip.setChecked(Boolean(s.canSkip));
								skip.setLayoutParams(G.LinearLayout.LayoutParams(-2, -2, 0));
								skip.getLayoutParams().setMargins(0, 0, 0, 10 * G.dp)
								skip.setText("不再提示");
								layout.addView(skip);
							}
							onClick = function(i) {
								if (s.skip) s.skip(skip.isChecked());
								if (s.callback && s.callback(i)) return;
								dialog[1].dismiss();
							}
							var but = (s.buttons || ["确定", "取消"]).map(function(e, i) {
								var b = new G.TextView(ctx);
								b.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
								b.setText(String(e));
								b.setGravity(G.Gravity.CENTER);
								b.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
								b.setTextColor(DataCollector.toTextColor(true));
								b.setTextSize(GUI.Configuration.mTextSize);
								if (G.sdk == 3) b.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 200, G.dp * 100, "rect"));
								b.setOnClickListener(new G.View.OnClickListener({
									onClick: function(v) {
										try {
											onClick(i);
											GUI.Util.objAnim(dialog[0], 75, new G.LinearInterpolator(), [{
												key: GUI.Configuration.AnimType.ALPHA,
												start: 1,
												end: 0
											}], function() {
												dialog[0].setAlpha(0);
												dialog[1].dismiss();
											});
										} catch (e) {
											ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showConfirmDialog$b.onClick", (function(sarg) {
												var arr = [];
												arr.push(ConsoleEmulator.traceErrorStack(e));
												for (var i in sarg) {
													arr.push(sarg[i])
												};
												return arr;
											}(arguments)));
											err(e);
										}
									}
								}));
								layout.addView(b);
								return b;
							});
							scr.addView(layout);
							dialog = GUI.Widget.showDialog(scr, -2, -2, s.onDismiss);
						} catch (e) {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Widget.showConfirmDialog", (function(sarg) {
								var arr = [];
								arr.push(ConsoleEmulator.traceErrorStack(e));
								for (var i in sarg) {
									arr.push(sarg[i])
								};
								return arr;
							}(arguments)));
							err(e);
						}
					})
				},
				showTopToast: function(title, text) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "Widget.showTopToast", arguments);
					G.ui(function() {
						var dismiss = function() {
							layout.setEnabled(false);
							GUI.Util.objAnim(titlex, 200, new G.LinearInterpolator(), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 1,
								end: 0
							}, ]);
							if (text) GUI.Util.objAnim(textx, 200, new G.LinearInterpolator(), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 1,
								end: 0
							}, ]);
							GUI.Util.objAnim(colorlay, 200, new G.DecelerateInterpolator(1), [{
								key: GUI.Configuration.AnimType.TRANSLATIONY,
								start: 0,
								end: -G.dp * 85
							}, ], function() {
								popup.dismiss();
							});
						}
						var colorlay = GUI.Widget.LinearLayout(-2, -2, "V", dismiss);
						colorlay.setAlpha(DataCollector.S_CONFIG.winalpha);
						colorlay.setBackgroundDrawable(G.ColorDrawable(DataCollector.toThemeColor()));
						var layout = GUI.Widget.LinearLayout(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.WRAP_CONTENT, "V");
						if (G.sdk == 3) layout.setBackgroundDrawable(GUI.Util.RippleDrawable(GUI.Configuration.width, G.dp * 85, "rect"));
						layout.setPadding(G.dp * 9, G.dp * 7.5, G.dp * 2.5, G.dp * 9);
						var titlex = GUI.Widget.TextView(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.WRAP_CONTENT, title);
						titlex.setTextColor(DataCollector.toTextColor(true));
						titlex.setTextSize(GUI.Configuration.sTextSize);
						titlex.setAlpha(0);
						layout.addView(titlex);
						if (text) {
							titlex.setTextSize(GUI.Configuration.mTextSize);
							var vx = GUI.Widget.View(G.ViewGroup.LayoutParams.FILL_PARENT, G.dp * 7.5);
							layout.addView(vx);
							var textx = GUI.Widget.TextView(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.WRAP_CONTENT, text);
							textx.setTextSize(GUI.Configuration.sTextSize);
							textx.setTextColor(DataCollector.toHintTextColor(true));
							textx.setAlpha(0);
							layout.addView(textx);
						}
						colorlay.addView(layout);
						var popup = new G.PopupWindow(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.WRAP_CONTENT);
						popup.setContentView(colorlay);
						popup.setWindowLayoutType(GUI.Configuration.DISPLAY_TYPE);
						popup.showAtLocation(ctx.getWindow().getDecorView(), 0, 0, 0);
						GUI.Util.objAnim(colorlay, 200, new G.DecelerateInterpolator(1), [{
							key: GUI.Configuration.AnimType.TRANSLATIONY,
							start: -G.dp * 85,
							end: 0
						}, ], function() {
							GUI.Util.objAnim(titlex, 200, new G.LinearInterpolator(), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 0,
								end: 1
							}, ]);
							java.lang.Thread.sleep(100);
							if (text) GUI.Util.objAnim(textx, 200, new G.LinearInterpolator(), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 0,
								end: 1
							}, ]);
						});
						var h = new android.os.Handler();
						h.postDelayed(dismiss, 1000 * 5);
					})
				},
			},
			PopupWindow: {
				//variable
				nowWindow: null,
				susShowWindow: null,
				cbk: {},

				isDisplayingSuspension: true,
				isDisplayingWindow: false,
				isChanging: false,
				defaultWindow: "GetStart", //global widgets
				popup: null,
				nativelay: null,
				grl: null,
				gbg: null,
				gll: null,
				gtb: null,
				gdismiss: null,
				gtitle: null,
				gsettings: null,
				gback: null,
				view: null,

				Window: {
					"Settings": {
						title: "设置",
						name: "Settings",
						views: function(self, current) {
							GUI.PopupWindow.gsettings.setImageBitmap(new G.Bitmap.createBitmap(1, 1, G.Bitmap.Config.ARGB_8888));
							GUI.PopupWindow.gsettings.setBackgroundDrawable(new G.ColorDrawable(G.Color.argb(0, 0, 0, 0)));

							var cachesize = 0;
							var d1, d2, d3;
							for (var i in d1 = java.io.File(DataCollector.tempFolder).listFiles()) {
								cachesize += java.io.File(d1[i]).length();
							}
							for (var i in d2 = java.io.File(DataCollector.pictureFolder).listFiles()) {
								cachesize += java.io.File(d2[i]).length();
							}
							for (var i in d3 = java.io.File(DataCollector.detailFolder).listFiles()) {
								cachesize += java.io.File(d3[i]).length();
							}

							self.w = GUI.Configuration.width, self.h = G.dp * 80, //defatut: 自定义(只有标题和描述，或者右面的提示)
								//tag: 标签
								//seek: 带有seekbar
								//check: 带有checkbox
								self.data = [{
									type: "tag",
									title: "GUI设置",
								}, {
									type: "check",
									title: "动画效果",
									description: "设置是否开启动画效果",
									value: DataCollector.S_CONFIG.anim,
									onClick: function(cb, value) {
										DataCollector.S_CONFIG.anim = value;
									},
								}, {
									type: "seek",
									title: "动画速度倍数",
									description: "设置所有动画的速度倍数",
									min: 0.25,
									max: 2.5,
									value: DataCollector.S_CONFIG.animSpeed,
									onEvent: function(env) {
										DataCollector.S_CONFIG.animSpeed = env;
									}
								}, {
									type: "seek",
									title: "窗口透明度",
									description: "设置窗口透明程度",
									min: 0.2,
									max: 1.0,
									value: DataCollector.S_CONFIG.winalpha,
									onEvent: function(env) {
										DataCollector.S_CONFIG.winalpha = env;
										GUI.PopupWindow.nativelay.setAlpha(DataCollector.S_CONFIG.winalpha);
									}
								}, {
									type: "default",
									title: "GUI唤醒动画",
									description: "设置当窗口打开时进入的动画效果",
									value: (DataCollector.S_CONFIG.fadeInAnim == GUI.Configuration.FadeInAnimType.circular ? "圆形扩散" : "阿尔法渐入"),
									onClick: function() {
										GUI.Widget.showOperateDialog([{ //showOperateDialog
											text: "圆形扩散" + (DataCollector.S_CONFIG.fadeInAnim == GUI.Configuration.FadeInAnimType.circular ? "(当前)" : ""),
											description: "圆形扩散效果\n(Android5.0以下不可用!)",
											onclick: function(v, tag) {
												if (G.sdk == 3) {
													DataCollector.S_CONFIG.fadeInAnim = GUI.Configuration.FadeInAnimType.circular;
												} else {
													DataCollector.S_CONFIG.fadeInAnim = GUI.Configuration.FadeInAnimType.alpha;
												}
											}
										}, {
											text: "阿尔法渐入" + (DataCollector.S_CONFIG.fadeInAnim == GUI.Configuration.FadeInAnimType.alpha ? "(当前)" : ""),
											description: "alpha渐入效果",
											onclick: function(v, tag) {
												DataCollector.S_CONFIG.fadeInAnim = GUI.Configuration.FadeInAnimType.alpha;
											}
										}]);
									}
								}, {
									type: "default",
									title: "主题颜色",
									description: "设置主题的颜色",
									value: (DataCollector.S_CONFIG.wTheme == "black") ? "黑色" : "白色",
									onClick: function() {
										GUI.Widget.showOperateDialog([{ //showOperateDialog
											text: "黑色" + (DataCollector.S_CONFIG.wTheme == "black" ? "(当前)" : ""),
											onclick: function(v, tag) {
												if (DataCollector.S_CONFIG.wTheme != "black") {
													DataCollector.S_CONFIG.wTheme = "black";
													GUI.PopupWindow.reload();
												}
											}
										}, {
											text: "白色" + (DataCollector.S_CONFIG.wTheme == "white" ? "(当前)" : ""),
											onclick: function(v, tag) {
												if (DataCollector.S_CONFIG.wTheme != "white") {
													DataCollector.S_CONFIG.wTheme = "white";
													GUI.PopupWindow.reload();
												}
											}
										}]);
									}
								}, {
									type: "default",
									title: "波纹形状",
									description: "设置按钮波纹动画特效的形状(个别)\n(Android5.0以下不可用!)",
									value: DataCollector.S_CONFIG.rippleshape,
									onClick: function() {
										GUI.Widget.showOperateDialog([{ //showOperateDialog
											text: "圆形" + (DataCollector.S_CONFIG.rippleshape == "oval" ? "(当前)" : ""),
											onclick: function(v, tag) {
												DataCollector.S_CONFIG.rippleshape = "oval";
											}
										}, {
											text: "方形" + (DataCollector.S_CONFIG.rippleshape == "rect" ? "(当前)" : ""),
											onclick: function(v, tag) {
												DataCollector.S_CONFIG.rippleshape = "rect";
											}
										}]);
									}
								}, {
									type: "tag",
									title: "播放器设置",
								}, {
									type: "default",
									title: "音频解码方式",
									description: "设置音乐播放器的解码方式",
									value: DataCollector.S_CONFIG.rippleshape,
									onClick: function() {
										GUI.Widget.showOperateDialog([{ //showOperateDialog
											text: "Native MPEG Audio Decoder",
											description: "在Native层用libmad解码。\n优点：解码速度最快，效率最高。\n缺点：可能有兼容性问题，解码时IO占用率高。",
											onclick: function(v, tag) {

											}
										}, {
											text: "Java Zoom Layer",
											description: "在Java层使用第三方解码库Java Zoom Layer解码。\n优点：解码速度较快，解码时IO占用率低。\n缺点：该库为测试版本，可能会有兼容性问题。",
											onclick: function(v, tag) {

											}
										}, {
											text: "Media Codec",
											description: "使用Android自带的MediaCodec解码。\n优点：所有设备都能用，兼容性最好\n缺点：解码速度最慢，解码时IO占用率较高",
											onclick: function(v, tag) {

											}
										}]);
									}
								}, {
									type: "tag",
									title: "隐私设置",
								}, {
									type: "default",
									title: "清除缓存",
									description: (cachesize / 1024 / 1024).toFixed(2) + " MB",
									onClick: function() {
										GUI.Widget.showConfirmDialog({
											title: "确认清除缓存吗",
											description: "注意：清除后将无法离线播放歌曲！\n包括歌曲在线缓存，歌曲信息，图片缓存。",
											callback: function(id) {
												if (id == 0) {
													var d1, d2, d3;
													for (var i in d1 = java.io.File(DataCollector.tempFolder).listFiles()) DataCollector.IO.delete(d1[i]);
													for (var i in d2 = java.io.File(DataCollector.pictureFolder).listFiles()) DataCollector.IO.delete(d2[i]);
													for (var i in d3 = java.io.File(DataCollector.detailFolder).listFiles()) DataCollector.IO.delete(d3[i]);
													GUI.Widget.showTopToast("已清除所有缓存");
													GUI.PopupWindow.reload();
												}
											},
										});
									}
								}, {
									type: "default",
									title: "清除所有信息",
									onClick: function() {
										GUI.Widget.showConfirmDialog({
											title: "确认要清除吗？",
											description: "清除所有信息，包括登陆的账号设置选项等\n此操作会同时退出应用，请确认你的MC已准备好退出。",
											callback: function(id) {
												if (id == 0) {
													DataCollector.clearAllData();
													java.lang.System.exit(0);
												}
											},
										});
									}
								}, {
									type: "default",
									title: "查看你的网络信息",
									onClick: function() {
										G.th(function() {
											var pd = GUI.Widget.showProgressDialog(null, true, true, false);
											var data = NetworkInterface.get("http://nstool.netease.com/info.js");
											pd.close();
											eval(data != "" ? data : "var ip = \"<Unknown>\", ip_province = \"<Unknown>\", ip_city = \"\"");
											GUI.Widget.showTextDialog("Public IP Address: " + ip + "\nLocation: " + ip_province + " " + ip_city);
										}).start();
									}
								}, {
									type: "tag",
									title: "其他",
								}, {
									type: "check",
									title: "搜索建议",
									description: "设置是否开启搜索建议(主界面有效，不稳定)",
									value: DataCollector.S_CONFIG.searchsuggest,
									onClick: function(cb, value) {
										DataCollector.S_CONFIG.searchsuggest = value;
									},
								}, {
									type: "check",
									title: "日志记录",
									description: "将对您的操作进行记录，有助于开发者寻找漏洞",
									value: DataCollector.S_CONFIG.log,
									onClick: function(cb, value) {
										DataCollector.S_CONFIG.log = value;
									},
								}, {
									type: "seek",
									title: "日志最大记录上限数目",
									description: "设置日志最大记录上限数目(设置太大在打开控制台以及滚动时会很卡)",
									min: 10,
									max: 200,
									round: true,
									value: DataCollector.S_CONFIG.maxLogStack,
									onEvent: function(env) {
										DataCollector.S_CONFIG.maxLogStack = env;
									}
								}, {
									type: "default",
									title: "更新日志",
									description: "点击查看更新日志",
									onClick: function() {
										G.th(function() {
											var pd = GUI.Widget.showProgressDialog(null, true, true, false);
											var data = NetworkInterface.get("https://gitee.com/eskarton/NeteaseCloudMusic.js/raw/master/note.txt");
											pd.close();
											GUI.Widget.showTextDialog(data != "" ? data : "请先连接网络！");
										}).start();
									}
								}, {
									type: "default",
									title: "GNU General Public License (Version 3)",
									description: "点击查看GPLv3协议",
									onClick: function() {
										G.th(function() {
											var pd = GUI.Widget.showProgressDialog(null, true, true, false);
											var data = NetworkInterface.get("https://gitee.com/eskarton/NeteaseCloudMusic.js/raw/master/LICENSE");
											pd.close();
											GUI.Widget.showTextDialog(data != "" ? data : "请先连接网络！");
										}).start();
									}
								}, {
									type: "default",
									title: "控制台",
									description: "点击进入控制台",
									onClick: function() {
										GUI.PopupWindow.goto(self, "Console", true);
									}
								}, ];

							self.ew = self.w - G.dp * 40;
							self.eh = self.h - G.dp * 40;

							self.adapter = function(e, i, a, params) {
								switch (e.type) {
									case "tag":
										e._v = GUI.Widget.TextView(self.w, G.dp * 50, String(e.title));
										e._v.setPadding(G.dp * 10, G.dp * 10, G.dp * 5, G.dp * 5);
										e._v.setTextColor(DataCollector.toHintTextColor(true));
										e._v.setGravity(G.Gravity.BOTTOM);
										e._v.setFocusable(true);
										return e._v;
									case "default":
										e._v = GUI.Widget.LinearLayout(self.w, -2, "H");
										e._v.setPadding(G.dp * 15, G.dp * 15, G.dp * 15, G.dp * 15);
										e._tv = GUI.Widget.LinearLayout(self.ew, -2, "V");
										e._title = GUI.Widget.TextView(self.ew, -2, String(e.title));
										e._tv.addView(e._title);
										if (e.description) {
											e._description = GUI.Widget.TextView(self.ew - self.eh, -2, String(e.description));
											e._description.setTextColor(DataCollector.toHintTextColor(true));
											e._description.setTextSize(GUI.Configuration.sTextSize);
											e._tv.addView(e._description);
										}
										e._v.addView(e._tv);
										return e._v;
									case "seek":
										var range = (e.max - e.min);
										e._handler = new android.os.Handler();
										e._v = GUI.Widget.LinearLayout(self.w, -2, "V");
										e._v.setPadding(G.dp * 15, G.dp * 15, G.dp * 15, G.dp * 15);
										e._title = GUI.Widget.TextView(self.ew, -2, String(e.title));
										e._v.addView(e._title);
										if (e.description) {
											e._description = GUI.Widget.TextView(self.ew - self.eh, -2, String(e.description));
											e._description.setTextColor(DataCollector.toHintTextColor(true));
											e._description.setTextSize(GUI.Configuration.sTextSize);
											e._v.addView(e._description);
										}
										e._seek = GUI.Widget.SeekBar(self.ew, -2, function(sb, progress) {
											var value = e.round ? Math.round(e.min + (progress / 100) * range) : (e.min + (progress / 100) * range);
											e.onEvent(value);
											e.value = value;
											e._description.setText(String(value.toFixed(e.round ? 0 : 2)));
											return true;
										}, function(sb) {
											e._handler.postDelayed(function() {
												GUI.Util.objAnim(e._description, 75, new G.LinearInterpolator(), [{
													key: GUI.Configuration.AnimType.ALPHA,
													start: 1,
													end: 0
												}, ], function() {
													e._description.setText(String(e.description));
													GUI.Util.objAnim(e._description, 75, new G.LinearInterpolator(), [{
														key: GUI.Configuration.AnimType.ALPHA,
														start: 0,
														end: 1
													}, ], function() {
														e._description.setAlpha(1);
													});
												});
											}, 1000);
											return true;
										});
										e._seek.setFocusable(false);
										e._seek.setMax(100);
										e._seek.setProgress(100 * ((e.value - e.min) / range));
										e._v.addView(e._seek);
										return e._v;
									case "check":
										e._v = GUI.Widget.LinearLayout(self.w, -2, "H");
										e._v.setPadding(G.dp * 15, G.dp * 15, G.dp * 5, G.dp * 15);
										e._tv = GUI.Widget.LinearLayout(self.ew - self.eh + G.dp * 10, -2, "V");
										e._tv.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
										e._title = GUI.Widget.TextView(self.ew - self.eh + G.dp * 10, -2, String(e.title));
										e._tv.addView(e._title);
										if (e.description) {
											e._description = GUI.Widget.TextView(self.ew - self.eh, -2, String(e.description));
											e._description.setTextColor(DataCollector.toHintTextColor(true));
											e._description.setTextSize(GUI.Configuration.sTextSize);
											e._tv.addView(e._description);
										}
										e._v.addView(e._tv);
										e._check = GUI.Widget.CheckBox(self.eh, self.eh, e.value, e.onClick);
										e._check.setFocusable(false);
										e._v.addView(e._check);
										return e._v;
								}
							}
							self.list = new G.ListView(ctx);
							self.list.setDividerHeight(0);
							self.list.setLayoutParams(new G.LinearLayout.LayoutParams(GUI.Configuration.width, -1));
							self.list.setAdapter(new GUI.Util.RhinoListAdapter(self.data, self.adapter));
							self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
								onItemClick: function(parent, view, pos, id) {
									var element = parent.getAdapter().getItem(pos);
									if (!element || element.type == "tag") return true;
									if (element.type == "default") {
										element.onClick(); //点击事件
									} else if (element.type == "check") {
										element._check.performClick(); //模拟点击checkbox
									}
								}
							}));

							GUI.PopupWindow.view.addView(self.list);
						},
						pretogo: function(self, current) {

						},
					},
				},

				//private operation
				pri_create: function self(current, displayMode) {
					//global popupwindow

					G.ui(function() {
						try {

							if (displayMode == GUI.Configuration.DisplayMode.SHOW) {

								GUI.PopupWindow.nativelay = new G.RelativeLayout(ctx);
								GUI.PopupWindow.nativelay.setPadding(G.width - GUI.Configuration.width, 0, 0, 0);
								GUI.PopupWindow.nativelay.setBackgroundColor(G.Color.argb(0x80, 0, 0, 0));
								GUI.PopupWindow.nativelay.setAlpha(DataCollector.S_CONFIG.winalpha);
								/*GUI.PopupWindow.nativelay.setOnKeyListener(new G.View.OnKeyListener({
									onKey: function(view, keycode, event) {
										GUI.Widget.showTopToast(keycode)
										if(keycode == G.KeyEvent.KEYCODE_BACK) GUI.PopupWindow.dismiss(self, current);
										return true;
									},
								}));*/

								GUI.PopupWindow.grl = new G.RelativeLayout(ctx);
								GUI.PopupWindow.grl.setLayoutParams(new G.RelativeLayout.LayoutParams(-1, -1));

								GUI.PopupWindow.gbg = new G.View(ctx);
								GUI.PopupWindow.gbg.setLayoutParams(new G.RelativeLayout.LayoutParams(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.FILL_PARENT));
								GUI.PopupWindow.gbg.setBackgroundColor(DataCollector.toThemeColor());
								GUI.PopupWindow.gbg.setEnabled(false);

								GUI.PopupWindow.gll = new G.LinearLayout(ctx);
								GUI.PopupWindow.gll.setLayoutParams(new G.LinearLayout.LayoutParams(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.FILL_PARENT));
								GUI.PopupWindow.gll.setOrientation(G.LinearLayout.VERTICAL);

								GUI.PopupWindow.gtb = new G.LinearLayout(ctx);
								GUI.PopupWindow.gtb.setLayoutParams(new G.LinearLayout.LayoutParams(G.ViewGroup.LayoutParams.FILL_PARENT, G.dp * 45));
								GUI.PopupWindow.gtb.setBackgroundColor(DataCollector.toDeepThemeColor());
								GUI.PopupWindow.gtb.setOrientation(G.LinearLayout.HORIZONTAL);
								GUI.PopupWindow.gtb.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
								if (G.sdk == 3) GUI.PopupWindow.gtb.setElevation(10 * G.dp);

								GUI.PopupWindow.gdismiss = new G.ImageView(ctx);
								GUI.PopupWindow.gdismiss.setLayoutParams(new G.LinearLayout.LayoutParams(G.dp * 37, G.dp * 37));
								GUI.PopupWindow.gdismiss.getLayoutParams().setMargins(G.dp * 4, G.dp * 4, G.dp * 4, G.dp * 4);
								GUI.PopupWindow.gdismiss.setScaleType(G.ImageView.ScaleType.CENTER_CROP);
								GUI.PopupWindow.gdismiss.setImageBitmap(DataCollector.toRes("close"));
								if (G.sdk == 3) GUI.PopupWindow.gdismiss.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
								GUI.PopupWindow.gdismiss.setOnClickListener(new G.View.OnClickListener({
									onClick: function(view) {
										GUI.PopupWindow.dismiss(self, current);
									}
								}));

								GUI.PopupWindow.gtitle = new G.TextView(ctx);
								GUI.PopupWindow.gtitle.setLayoutParams(new G.LinearLayout.LayoutParams(GUI.Configuration.width - G.dp * (45 * 3 + 6), G.dp * 37));
								GUI.PopupWindow.gtitle.getLayoutParams().setMargins(G.dp * 4, G.dp * 4, G.dp * 4, G.dp * 4);
								GUI.PopupWindow.gtitle.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
								GUI.PopupWindow.gtitle.setTextSize(GUI.Configuration.mTextSize);
								GUI.PopupWindow.gtitle.setTextColor(DataCollector.toTextColor(true));
								GUI.PopupWindow.gtitle.setEllipsize(G.TextUtils.TruncateAt.END);
								GUI.PopupWindow.gtitle.setTypeface(GUI.Configuration.typeface);
								GUI.PopupWindow.gtitle.setText(current.title ? String(current.title) : "");

								GUI.PopupWindow.gsettings = new G.ImageView(ctx);
								GUI.PopupWindow.gsettings.setLayoutParams(new G.LinearLayout.LayoutParams(G.dp * 37, G.dp * 37));
								GUI.PopupWindow.gsettings.getLayoutParams().setMargins(G.dp * 4, G.dp * 4, G.dp * 4, G.dp * 4);
								GUI.PopupWindow.gsettings.setScaleType(G.ImageView.ScaleType.CENTER_CROP);
								GUI.PopupWindow.gsettings.setImageBitmap(DataCollector.toRes("settings"));
								GUI.PopupWindow.gsettings.setPadding(G.dp * 3, G.dp * 3, G.dp * 3, G.dp * 3)
								if (G.sdk == 3) GUI.PopupWindow.gsettings.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
								GUI.PopupWindow.gsettings.setOnClickListener(new G.View.OnClickListener({
									onClick: function(view) {
										GUI.PopupWindow.goto(self, "Settings", true);
									}
								}));

								GUI.PopupWindow.gback = new G.ImageView(ctx);
								GUI.PopupWindow.gback.setLayoutParams(new G.LinearLayout.LayoutParams(G.dp * 37, G.dp * 37));
								GUI.PopupWindow.gback.getLayoutParams().setMargins(G.dp * 4, G.dp * 4, G.dp * 4, G.dp * 4);
								GUI.PopupWindow.gback.setScaleType(G.ImageView.ScaleType.CENTER_CROP);
								GUI.PopupWindow.gback.setRotation(180);
								GUI.PopupWindow.gback.setImageBitmap(DataCollector.toRes("arrow_back"));
								if (G.sdk == 3) GUI.PopupWindow.gback.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
								GUI.PopupWindow.gback.setOnClickListener(new G.View.OnClickListener({
									onClick: function(view) {
										GUI.PopupWindow.back(self, current);
									}
								}));

								GUI.PopupWindow.gtb.addView(GUI.PopupWindow.gback);
								GUI.PopupWindow.gtb.addView(GUI.PopupWindow.gtitle);
								GUI.PopupWindow.gtb.addView(GUI.PopupWindow.gsettings);
								GUI.PopupWindow.gtb.addView(GUI.PopupWindow.gdismiss);

								GUI.PopupWindow.view = new G.LinearLayout(ctx);
								GUI.PopupWindow.view.setLayoutParams(new G.LinearLayout.LayoutParams(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.FILL_PARENT));
								GUI.PopupWindow.view.setOrientation(G.LinearLayout.VERTICAL);
								GUI.PopupWindow.view.setBackgroundColor(DataCollector.toThemeColor());

								GUI.PopupWindow.gll.addView(GUI.PopupWindow.gtb);
								GUI.PopupWindow.gll.addView(GUI.PopupWindow.view);
								GUI.PopupWindow.grl.addView(GUI.PopupWindow.gll);
								GUI.PopupWindow.grl.addView(GUI.PopupWindow.gbg);
								GUI.PopupWindow.nativelay.addView(GUI.PopupWindow.grl);

								GUI.PopupWindow.popup = new G.PopupWindow(G.ViewGroup.LayoutParams.FILL_PARENT, G.ViewGroup.LayoutParams.FILL_PARENT);
								GUI.PopupWindow.popup.setFocusable(true);
								GUI.PopupWindow.popup.setOutsideTouchable(false);
								GUI.PopupWindow.popup.setContentView(GUI.PopupWindow.nativelay);
								GUI.PopupWindow.popup.setSoftInputMode(G.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
								GUI.PopupWindow.popup.setInputMethodMode(G.PopupWindow.INPUT_METHOD_NEEDED);
								GUI.PopupWindow.popup.setWindowLayoutType(GUI.Configuration.DISPLAY_TYPE);
								GUI.PopupWindow.popup.showAtLocation(ctx.getWindow().getDecorView(), 0, 0, 0);
								//circular animation

								GUI.Util.objAnim(GUI.PopupWindow.nativelay, 200, new G.LinearInterpolator(), [{
									key: GUI.Configuration.AnimType.ALPHA,
									start: 0,
									end: DataCollector.S_CONFIG.winalpha
								}, ]);
								GUI.Util.objAnim(GUI.PopupWindow.grl, 200, new G.DecelerateInterpolator(), [{
									key: GUI.Configuration.AnimType.TRANSLATIONX,
									start: GUI.Configuration.width,
									end: 0
								}, ], function() {

									try {
										current.views(self, current);
									} catch (e) {
										ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "GUI.PopupWindow.pri_create$current.views", (function(sarg) {
											var arr = [];
											arr.push(ConsoleEmulator.traceErrorStack(e));
											for (var i in sarg) {
												arr.push(sarg[i])
											};
											return arr;
										}(arguments)));
									}

									switch (DataCollector.S_CONFIG.fadeInAnim) {
										case GUI.Configuration.FadeInAnimType.circular:
											GUI.PopupWindow.grl.setBackgroundColor(DataCollector.toThemeColor());
											GUI.PopupWindow.gbg.setVisibility(G.View.GONE);
											GUI.Util.objAnim(GUI.PopupWindow.gtb, 200, new G.DecelerateInterpolator(1), [{
												key: GUI.Configuration.AnimType.TRANSLATIONY,
												start: -G.dp * 45,
												end: 0
											}]);
											GUI.Util.circularAnim(GUI.PopupWindow.gll, 500, new G.DecelerateInterpolator(2), function() {
												GUI.PopupWindow.nativelay.setEnabled(true);
											});
											break;
										case GUI.Configuration.FadeInAnimType.alpha:
											GUI.PopupWindow.grl.setBackgroundColor(DataCollector.toThemeColor());
											GUI.Util.objAnim(GUI.PopupWindow.gbg, 500, new G.DecelerateInterpolator(2), [{
												key: GUI.Configuration.AnimType.ALPHA,
												start: 1,
												end: 0
											}, ], function() {
												if (!GUI.PopupWindow.isChanging && GUI.PopupWindow.isDisplayingWindow) {
													GUI.PopupWindow.nativelay.setEnabled(true);
													GUI.PopupWindow.gbg.setVisibility(G.View.GONE);
												}
											});
											GUI.Util.objAnim(GUI.PopupWindow.gtb, 200, new G.DecelerateInterpolator(1), [{
												key: GUI.Configuration.AnimType.TRANSLATIONY,
												start: -G.dp * 45,
												end: 0
											}]);
											GUI.Util.objAnim(GUI.PopupWindow.view, 500, new G.DecelerateInterpolator(2), [{
												key: GUI.Configuration.AnimType.SCALEX,
												start: 0.97,
												end: 1
											}, {
												key: GUI.Configuration.AnimType.SCALEY,
												start: 0.97,
												end: 1
											}, ]);
											break;
									}

								});

							} else if (displayMode == GUI.Configuration.DisplayMode.GOTO) {

								//Update Events
								GUI.PopupWindow.gbg.setBackgroundColor(DataCollector.toThemeColor());
								GUI.PopupWindow.gtb.setBackgroundColor(DataCollector.toDeepThemeColor());
								GUI.PopupWindow.gtitle.setText(current.title ? String(current.title) : "");
								GUI.PopupWindow.gdismiss.setImageBitmap(DataCollector.toRes("close"));
								GUI.PopupWindow.gtitle.setTextColor(DataCollector.toTextColor(true));
								if (G.sdk == 3) GUI.PopupWindow.gtb.setElevation(G.dp * 10);
								GUI.PopupWindow.gdismiss.setOnClickListener(new G.View.OnClickListener({
									onClick: function(view) {
										GUI.PopupWindow.dismiss(self, current);
									}
								}));
								GUI.PopupWindow.gback.setImageBitmap(DataCollector.toRes("arrow_back"));
								GUI.PopupWindow.gback.setOnClickListener(new G.View.OnClickListener({
									onClick: function(view) {
										GUI.PopupWindow.back(self, current);
									}
								}));
								GUI.PopupWindow.gsettings.setImageBitmap(DataCollector.toRes("settings"));
								if (G.sdk == 3) {
									GUI.PopupWindow.gback.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 45, G.dp * 45));
									GUI.PopupWindow.gdismiss.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 45, G.dp * 45));
									GUI.PopupWindow.gsettings.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 45, G.dp * 45));
								}

								GUI.PopupWindow.gll.removeView(GUI.PopupWindow.view);
								GUI.PopupWindow.view = new G.LinearLayout(ctx);
								GUI.PopupWindow.view.setLayoutParams(new G.LinearLayout.LayoutParams(G.ViewGroup.LayoutParams.FILL_PARENT, GUI.Configuration.height - G.dp * 45));
								GUI.PopupWindow.view.setBackgroundColor(DataCollector.toThemeColor());
								GUI.PopupWindow.gll.addView(GUI.PopupWindow.view);

								try {
									current.views(self, current);
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "GUI.PopupWindow.pri_create$current.views", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
								}

								switch (DataCollector.S_CONFIG.fadeInAnim) {
									case GUI.Configuration.FadeInAnimType.circular:
										GUI.PopupWindow.grl.setBackgroundColor(DataCollector.toThemeColor());
										GUI.PopupWindow.gbg.setVisibility(G.View.GONE);
										GUI.Util.objAnim(GUI.PopupWindow.gtb, 200, new G.DecelerateInterpolator(1), [{
											key: GUI.Configuration.AnimType.TRANSLATIONY,
											start: -G.dp * 45,
											end: 0
										}]);
										GUI.Util.circularAnim(GUI.PopupWindow.gll, 500, new G.DecelerateInterpolator(2), function() {
											GUI.PopupWindow.nativelay.setEnabled(true);
										});
										break;
									case GUI.Configuration.FadeInAnimType.alpha:
										GUI.PopupWindow.grl.setBackgroundColor(DataCollector.toThemeColor());
										GUI.Util.objAnim(GUI.PopupWindow.gbg, 500, new G.DecelerateInterpolator(2), [{
											key: GUI.Configuration.AnimType.ALPHA,
											start: 1,
											end: 0
										}, ], function() {
											if (!GUI.PopupWindow.isChanging && GUI.PopupWindow.isDisplayingWindow) {
												GUI.PopupWindow.nativelay.setEnabled(true);
												GUI.PopupWindow.gbg.setVisibility(G.View.GONE);
											}
										});
										GUI.Util.objAnim(GUI.PopupWindow.gtb, 200, new G.DecelerateInterpolator(1), [{
											key: GUI.Configuration.AnimType.TRANSLATIONY,
											start: -G.dp * 45,
											end: 0
										}]);
										GUI.Util.objAnim(GUI.PopupWindow.view, 500, new G.DecelerateInterpolator(2), [{
											key: GUI.Configuration.AnimType.SCALEX,
											start: 0.97,
											end: 1
										}, {
											key: GUI.Configuration.AnimType.SCALEY,
											start: 0.97,
											end: 1
										}, ]);
										break;
								}

							}
							GUI.PopupWindow.nowWindow = current.name;
							

						} catch (e) {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "GUI.PopupWindow.pri_create", (function(sarg) {
								var arr = [];
								arr.push(ConsoleEmulator.traceErrorStack(e));
								for (var i in sarg) {
									arr.push(sarg[i])
								};
								return arr;
							}(arguments)));
						}
					});
							if(current.execute) current.execute(self, current);
				},

				//public operation
				initialize: function() {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.initialize");
					this.nativelay = null;
					this.grl = null;
					this.gbg = null;
					this.gll = null;
					this.gtb = null;
					this.gdismiss = null;
					this.gtitle = null;
					this.gsettings = null;
					this.gback = null;
					this.view = null;
				},
				goto: function(self, targetS, sp) {
					
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.goto", arguments);
					if (targetS != GUI.PopupWindow.nowWindow && GUI.PopupWindow.isDisplayingWindow && !GUI.PopupWindow.isDisplayingSuspension) {
						GUI.PopupWindow.isChanging = true;
						G.ui(function() {
							GUI.PopupWindow.nativelay.setEnabled(false);
							GUI.PopupWindow.gbg.setVisibility(G.View.VISIBLE);
						});
						var period = GUI.PopupWindow.nowWindow;
						GUI.PopupWindow.Window[period].pretogo(self, GUI.PopupWindow.Window[period]);
						if (sp) {
							GUI.PopupWindow.cbk[targetS] = period;
						}
						GUI.Util.objAnim(GUI.PopupWindow.gtb, 200, new G.AccelerateInterpolator(), [{
							key: GUI.Configuration.AnimType.TRANSLATIONY,
							start: 0,
							end: -G.dp * 45
						}]);
						GUI.Util.objAnim(GUI.PopupWindow.gbg, 100, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}, ], function() {
							GUI.PopupWindow.isChanging = false;
							GUI.PopupWindow.pri_create(GUI.PopupWindow.Window[targetS], GUI.Configuration.DisplayMode.GOTO);
						});
						GUI.Util.objAnim(GUI.PopupWindow.view, 100, new G.DecelerateInterpolator(), [{
							key: GUI.Configuration.AnimType.SCALEX,
							start: 1,
							end: 0.97
						}, {
							key: GUI.Configuration.AnimType.SCALEY,
							start: 1,
							end: 0.97
						}, ]);
					}
				},
				back: function(self) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.back", arguments);
					if (GUI.PopupWindow.isDisplayingWindow && GUI.PopupWindow.nowWindow != GUI.PopupWindow.cbk[GUI.PopupWindow.nowWindow] && GUI.PopupWindow.cbk[GUI.PopupWindow.nowWindow]) {
						GUI.PopupWindow.goto(self, GUI.PopupWindow.cbk[GUI.PopupWindow.nowWindow], false);
					}
				},
				reload: function() {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.reload");
					if (GUI.PopupWindow.isDisplayingWindow) {
						GUI.PopupWindow.isChanging = true;
						G.ui(function() {
							GUI.PopupWindow.nativelay.setEnabled(false);
							GUI.PopupWindow.gbg.setVisibility(G.View.VISIBLE);
						});
						GUI.Util.objAnim(GUI.PopupWindow.gtb, 50, new G.AccelerateInterpolator(), [{
							key: GUI.Configuration.AnimType.TRANSLATIONY,
							start: 0,
							end: -G.dp * 45
						}]);
						GUI.Util.objAnim(GUI.PopupWindow.gbg, 50, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}, ], function() {
							GUI.PopupWindow.isChanging = false;
							GUI.PopupWindow.pri_create(GUI.PopupWindow.Window[GUI.PopupWindow.nowWindow], GUI.Configuration.DisplayMode.GOTO);
						});
					}
				},
				dismiss: function(self, current) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.dismiss", arguments);
					if (GUI.PopupWindow.isDisplayingWindow) {
						G.ui(function() {
							GUI.PopupWindow.nativelay.setEnabled(false);
						});
						GUI.PopupWindow.isDisplayingWindow = false;
						GUI.PopupWindow.isDisplayingSuspension = true;
						GUI.PopupWindow.susShowWindow = GUI.PopupWindow.nowWindow;
						GUI.PopupWindow.nowWindow = "";
						current.pretogo(self, current);
						GUI.Util.objAnim(GUI.PopupWindow.grl, 200, new G.AccelerateInterpolator(1), [{
							key: GUI.Configuration.AnimType.TRANSLATIONX,
							start: 0,
							end: GUI.Configuration.width
						}]);
						GUI.Util.objAnim(GUI.PopupWindow.nativelay, 200, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: DataCollector.S_CONFIG.winalpha,
							end: 0
						}], function() {
							GUI.PopupWindow.initialize();
							GUI.PopupWindow.popup.dismiss();
							GUI.PopupWindow.showSuspension();
						});
					}
				},
				show: function(targetS) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.show", arguments);
					GUI.PopupWindow.observeGravity();
					if (GUI.PopupWindow.Window[targetS]) {
						if (!GUI.PopupWindow.isDisplayingWindow && GUI.PopupWindow.nowWindow != targetS) {
							GUI.PopupWindow.isDisplayingWindow = true;
							GUI.PopupWindow.isDisplayingSuspension = false;
							GUI.PopupWindow.nowWindow = targetS;
							GUI.PopupWindow.pri_create(GUI.PopupWindow.Window[targetS], GUI.Configuration.DisplayMode.SHOW);
						} else {
							GUI.Widget.showTopToast("Invaild operation.");
						}
					} else {
						GUI.Widget.showTopToast("Window \"" + targetS + "\" not found.");
					}
				},
				addWindow: function(window) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "PopupWindow.addWindow", arguments);
					GUI.PopupWindow.Window[window.name] = window;
					GUI.PopupWindow.cbk[window.name] = null;
				},

				showSuspension: function self() {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "GUI.PopupWindow.showSuspension");
					G.ui(function() {
						GUI.PopupWindow.suspension = true;
						GUI.PopupWindow.susV = new G.View(ctx);
						GUI.PopupWindow.susV.setBackgroundDrawable(new G.ColorDrawable(G.Color.argb(255, 125, 45, 155)));
						GUI.PopupWindow.susV.setLayoutParams(new G.LinearLayout.LayoutParams(G.dp * 30 + (Math.sqrt(2) - 1) * G.dp * 15, G.dp * 30 + (Math.sqrt(2) - 1) * G.dp * 15));
						GUI.PopupWindow.susV.setOnClickListener(new G.View.OnClickListener({
							onClick: function(view) {
								GUI.Util.objAnim(GUI.PopupWindow.susV, 200, new G.DecelerateInterpolator(2), [{
									key: GUI.Configuration.AnimType.ALPHA,
									start: 1,
									end: 0
								}, {
									key: GUI.Configuration.AnimType.SCALEX,
									start: 1,
									end: 0
								}, {
									key: GUI.Configuration.AnimType.SCALEY,
									start: 1,
									end: 0
								}, {
									key: GUI.Configuration.AnimType.ROTATION,
									start: 0.0,
									end: 180.0
								}, ], function() {
									GUI.PopupWindow.isDisplayingSuspension = false;
									self.suspension.dismiss();
								});
								GUI.PopupWindow.show(GUI.PopupWindow.susShowWindow ? GUI.PopupWindow.susShowWindow : GUI.PopupWindow.defaultWindow);

								return true;
							},
						}));
						GUI.PopupWindow.susV.setOnTouchListener(new G.View.OnTouchListener({
							onTouch: function onTouchFunction(view, event) {
								//(projectXero)
								switch (event.getAction()) {
									case event.ACTION_MOVE:
										self.suspension.update(
											DataCollector.S_CONFIG.suspendedCoordinate.x = self.x = event.getRawX() + onTouchFunction.offsetX, DataCollector.S_CONFIG.suspendedCoordinate.y = self.y = event.getRawY() + onTouchFunction.offsetY, -1, -1);
										break;
									case event.ACTION_DOWN:
										onTouchFunction.offsetX = self.x - event.getRawX();
										onTouchFunction.offsetY = self.y - event.getRawY();
										break;
								}
								return false;
							},
						}));
						self.suspension = new G.PopupWindow(GUI.PopupWindow.susV, G.dp * 30 + (Math.sqrt(2) - 1) * G.dp * 15, G.dp * 30 + (Math.sqrt(2) - 1) * G.dp * 15);
						self.suspension.setWindowLayoutType(GUI.Configuration.DISPLAY_TYPE);
						self.suspension.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.LEFT | G.Gravity.TOP, self.x = DataCollector.S_CONFIG.suspendedCoordinate.x, self.y = DataCollector.S_CONFIG.suspendedCoordinate.y);
						GUI.Util.objAnim(GUI.PopupWindow.susV, 200, new G.DecelerateInterpolator(2), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}, {
							key: GUI.Configuration.AnimType.SCALEX,
							start: 0,
							end: 1
						}, {
							key: GUI.Configuration.AnimType.SCALEY,
							start: 0,
							end: 1
						}, {
							key: GUI.Configuration.AnimType.ROTATION,
							start: -180.0,
							end: 0.0
						}, ]);
					});
				},
				observeGravity: function() {
					var dm = ctx.getResources().getDisplayMetrics();
					G.width = dm.widthPixels;
					G.height = dm.heightPixels;
					GUI.Configuration.width = (dm.widthPixels > dm.heightPixels) ? dm.heightPixels : dm.widthPixels;
					GUI.Configuration.height = dm.heightPixels;
				},
			},
			Util: {
				objAnim: function(object, duration, interpolator, objJSON, endEvent) {
					if (DataCollector.S_CONFIG.anim) {
						G.ui(function() {
							var objectAnimator;
							for (var i in objJSON) {
								objectAnimator = G.ObjectAnimator.ofFloat(object, objJSON[i].key, objJSON[i].start, objJSON[i].end);
								objectAnimator.setDuration(duration * DataCollector.S_CONFIG.animSpeed);
								objectAnimator.setInterpolator(interpolator);
								if (i == objJSON.length - 1) {
									objectAnimator.addListener(new G.Animator.AnimatorListener({
										onAnimationstart: function() {},
										onAnimationEnd: (typeof(endEvent) != "function") ? function() {} : endEvent,
										onAnimationRepeat: function() {},
										onAnimationCancel: function() {},
									}));
								}
								objectAnimator.start();
							}
						});
					} else {
						if (typeof(endEvent) == "function") {
							endEvent();
						}
					}
				},
				circularAnim: function(view, duration, interpolator, endEvent, x, y) {
					if (DataCollector.S_CONFIG.anim) {
						if (G.sdk == 3) {
							G.ui(function() {
								view.addOnLayoutChangeListener(new G.View.OnLayoutChangeListener() {
									onLayoutChange: function(v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) {
										v.removeOnLayoutChangeListener(this);
										var cirx = (left + right) / 2;
										var ciry = (top + bottom) / 2;
										var startX = 0;
										var startY = Math.sqrt(cirx * cirx + ciry * ciry);
										var animator = G.ViewAnimationUtils.createCircularReveal(v, x ? x : cirx, y ? y : ciry, startX, startY);
										animator.setInterpolator(interpolator);
										animator.setDuration(duration * DataCollector.S_CONFIG.animSpeed);
										animator.addListener(new G.Animator.AnimatorListener({
											onAnimationstart: function() {},
											onAnimationEnd: (typeof(endEvent) != "function") ? function() {} : endEvent,
											onAnimationRepeat: function() {},
											onAnimationCancel: function() {},
										}));
										animator.start();
									}
								});
								//refreash
								view.setLayoutParams(view.layoutParams);
							});
						} else {
							//仿圆形动画
						}
					} else {
						if (typeof(endEvent) == "function") {
							endEvent();
						}
					}
				}, // API >= LOLIPOP
				RippleDrawable: function(width, height, customshape) {
					var rs = null;
					if (!customshape) {
						if (DataCollector.S_CONFIG.rippleshape == "oval") {
							rs = new G.OvalShape();
						} else if (DataCollector.S_CONFIG.rippleshape == "rect") {
							rs = new G.RectShape();
						}
					} else {
						if (customshape == "oval") {
							rs = new G.OvalShape();
						} else if (customshape == "rect") {
							rs = new G.RectShape();
						} else if (customshape == "roundrect") {
							rs = new G.RoundRectShape(
								[arguments[3], arguments[3], arguments[3], arguments[3], arguments[3], arguments[3], arguments[3], arguments[3]], new G.RectF(0, 0, width, height), null //[0, 0, width, 0, width, height, 0, height]
							);
						}
					}
					rs.draw(new G.Canvas(), new G.Paint());
					var mask = new G.ShapeDrawable(rs);
					var gradientDrawable = new G.GradientDrawable();
					gradientDrawable.setColor(G.Color.TRANSPARENT);
					if (customshape == "roundrect") gradientDrawable.setCornerRadius(arguments[3]);
					gradientDrawable.setStroke(G.dp * 10, G.Color.TRANSPARENT);
					return (new G.RippleDrawable(G.ColorStateList.valueOf(G.Color.argb(64, 0, 0, 0)), gradientDrawable, mask));
				},
				roundPx: function(width, height, color, px) {
					var bitmap = G.Bitmap.createBitmap(width, height, G.Bitmap.Config.ARGB_8888);
					var canvas = new G.Canvas(bitmap);
					var paint = new G.Paint();
					var rectF = new G.RectF(0, 0, width, height);
					paint.setAntiAlias(true);
					paint.setColor(color);
					paint.setStrokeWidth(1);
					paint.setStyle(G.Paint.Style.FILL);
					canvas.drawColor(G.Color.TRANSPARENT, G.PorterDuff.Mode.CLEAR);
					canvas.drawRoundRect(rectF, px, px, paint);
					return bitmap;
				}, //From Blog@军临城下(https://blog.csdn.net/qq_27856623/article/details/64439477)
				getCircularBitmap: function(originBitmap) {
					try {
						var w = originBitmap.getWidth(); // 得到图片的宽，高
						var h = originBitmap.getHeight();
						var cropWidth = w >= h ? h : w; // 裁切后所取的正方形区域边长

						var cropedBitmap = G.Bitmap.createBitmap(originBitmap, (originBitmap.getWidth() - cropWidth) / 2,
							(originBitmap.getHeight() - cropWidth) / 2, cropWidth, cropWidth);

						var circleBitmap = G.Bitmap.createBitmap(cropedBitmap.getWidth(),
							cropedBitmap.getHeight(), G.Bitmap.Config.ARGB_8888);
						var canvas = new G.Canvas(circleBitmap);
						var paint = new G.Paint();
						var rect = new G.Rect(0, 0, cropedBitmap.getWidth(),
							cropedBitmap.getHeight());
						var rectF = new G.RectF(rect);
						var roundPx = 0.0;
						roundPx = cropedBitmap.getWidth();
						paint.setAntiAlias(true);
						canvas.drawARGB(0, 0, 0, 0);
						paint.setColor(G.Color.WHITE);
						canvas.drawRoundRect(rectF, roundPx, roundPx, paint);
						paint.setXfermode(new G.PorterDuffXfermode(G.PorterDuff.Mode.SRC_IN));
						var src = new G.Rect(0, 0, cropedBitmap.getWidth(),
							cropedBitmap.getHeight());
						canvas.drawBitmap(cropedBitmap, src, rect, paint);
						return circleBitmap;
					} catch (e) {
						ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Util.getCircularBitmap", (function(sarg) {
							var arr = [];
							arr.push(ConsoleEmulator.traceErrorStack(e));
							for (var i in sarg) {
								arr.push(sarg[i])
							};
							return arr;
						}(arguments)));
					}
				},
				paintColor: function(bitmap, replacedColor) {
					var rBitmap = G.Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), G.Bitmap.Config.ARGB_8888);
					var canvas = new G.Canvas(rBitmap);
					var paint = new G.Paint();
					var rect = new G.Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
					paint.setAntiAlias(true);
					canvas.drawARGB(0, 0, 0, 0);
					paint.setColorFilter(new G.PorterDuffColorFilter(replacedColor, android.graphics.PorterDuff.Mode.SRC_IN));
					canvas.drawBitmap(bitmap, rect, rect, paint);
					return rBitmap;
				},
				StackBlur: {
					process: function(sbo, radius) {
						ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, GUI.module, "Util.StackBlur.process");
						if (DataCollector.nativestackblurloaded) {
							return sbo.processNative(radius);
						} else {
							return sbo.processJava(radius);
						}
					},
				},
				VisualizerView: {
					jclass: null,
					newObject: function(context, bitmap) {
						var constructor = GUI.Util.VisualizerView.jclass.getConstructor([java.lang.Class.forName("android.content.Context"), java.lang.Class.forName("android.graphics.Bitmap")]);
						return constructor.newInstance(context, bitmap);
					}
				}, // Rhino list adapter (from@projectXero <GLPv3>)
				RhinoListAdapter: (function() {
					var r = function(arr, vmaker, params, preload) {
						//arr是列表数组，vmaker(element, index, array, params)从item生成指定view
						var src = arr.slice(),
							views = new Array(arr.length),
							dso = [],
							controller;
						if (preload) {
							src.forEach(function(e, i, a) {
								views[i] = vmaker(e, i, a, params);
							});
						}
						controller = new GUI.Util.RhinoListAdapter.Controller(src, views, dso, vmaker, params, preload);
						return new G.ListAdapter({
							getCount: function() {
								return src.length;
							},
							getItem: function(pos) {
								if (pos == -1) return controller;
								return src[pos];
							},
							getItemId: function(pos) {
								return pos;
							},
							getItemViewType: function(pos) {
								return 0;
							},
							getView: function(pos, convert, parent) {
								try {
									return views[pos] ? views[pos] : (views[pos] = vmaker(src[pos], parseInt(pos), src, params));
								} catch (e) {
									var a = new G.TextView(ctx);
									a.setText(e + "\n" + e.stack);
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Util.RLA.getView", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									err(e);
									return a;
								}
							},
							getViewTypeCount: function() {
								return 1;
							},
							hasStableIds: function() {
								return true;
							},
							isEmpty: function() {
								return src.length === 0;
							},
							areAllItemsEnabled: function() {
								return true;
							},
							isEnabled: function(pos) {
								return pos >= 0 && pos < src.length;
							},
							registerDataSetObserver: function(p) {
								if (dso.indexOf(p) >= 0) return;
								dso.push(p);
							},
							unregisterDataSetObserver: function(p) {
								var i = dso.indexOf(p);
								if (p >= 0) dso.splice(i, 1);
							}
						});
					}
					r.Controller = function(src, views, dso, vmaker, params, preload) {
						this.src = src;
						this.views = views;
						this.dso = dso;
						this.vmaker = vmaker;
						this.params = params;
						this.preload = preload;
					}
					r.Controller.prototype = {
						notifyChange: function() {
							this.dso.forEach(function(e) {
								if (e) e.onChanged();
							});
						},
						notifyInvalidate: function() {
							this.dso.forEach(function(e) {
								if (e) e.onInvalidated();
							});
						},
						add: function(e, isInv) {
							this.src.push(e);
							if (this.preload) this.views.push(this.vmaker(e, this.src.length - 1, this.src, this.params));
							if (isInv) this.notifyChange();
						},
						concat: function(arr) {
							arr.forEach(function(e) {
								this.src.push(e)
								if (this.preload) this.views.push(this.vmaker(e, this.src.length - 1, this.src, this.params));
							}, this);
							this.notifyChange();
						},
						filter: function(f, thisArg) {
							var i;
							for (i = 0; i < this.src.length; i++) {
								if (!f.call(thisArg, this.src[i], i, this.src)) {
									this.src.splice(i, 1);
									this.views.splice(i, 1);
									i--;
								}
							}
							this.notifyChange();
						},
						forEach: function(f, thisArg) {
							var i;
							for (i in this.src) {
								if (f.call(thisArg, this.src[i], i, this.src)) {
									this.views[i] = this.vmaker(this.src[i], i, this.src, this.params);
								}
							}
							this.notifyChange();
						},
						get: function(i) {
							if (typeof(i) == "number") {
								return this.src[i];
							} else {
								return this.src;
							}
						},
						insert: function(e, i, respawn) {
							this.src.splice(i, 0, e);
							if (respawn) {
								this.respawnAll();
							} else {
								this.views.splice(i, 0, this.preload ? this.vmaker(e, i, this.src, this.params) : null);
							}
							this.notifyChange();
						},
						length: function() {
							return this.src.length;
						},
						remove: function(e, respawn) {
							var i;
							for (i = this.src.length; i >= 0; i--) {
								if (this.src[i] != e) continue;
								this.src.splice(i, 1);
								this.views.splice(i, 1);
							}
							if (respawn) this.respawnAll();
							this.notifyChange();
						},
						removeByIndex: function(i, respawn) {
							this.src.splice(i, 1);
							this.views.splice(i, 1);
							if (respawn) this.respawnAll();
							this.notifyChange();
						},
						removeAll: function(respawn) {
							this.src.length = 0;
							this.views.length = 0;
							if (respawn) this.respawnAll();
						},
						replace: function(e, i) {
							this.src[i] = e;
							this.views[i] = this.preload ? this.vmaker(e, i, this.src, this.params) : null;
							this.notifyChange();
						},
						respawn: function(i) {
							this.views[i] = this.vmaker(this.src[i], i, this.src, this.params);
							this.notifyChange();
						},
						respawnAll: function(i) {
							this.src.forEach(function(e, i, a) {
								this.views[i] = this.vmaker(e, i, a, this.params);
							}, this);
							this.notifyChange();
						},
						slice: function(start, end) {
							return Array.prototype.slice.apply(this.src, arguments);
						},
						splice: function(index, len) {
							var i, z = [];
							for (i in arguments) z.push(arguments[i]);
							var r = Array.prototype.splice.apply(this.src, z);
							for (i = 2; i < z.length; i++) {
								z[i] = this.preload ? this.vmaker(z[i], i - 2 + index, this.src, this.params) : null;
							}
							Array.prototype.splice.apply(this.views, z);
							this.notifyChange();
						},
						getArray: function() {
							return this.src.slice();
						},
						setArray: function(a) {
							this.views.length = this.src.length = 0;
							for (var i in a) this.src.push(a[i]);
							this.views.length = this.src.length;
							if (this.preload) {
								this.respawnAll();
							} else {
								this.notifyChange();
							}
						}
					}
					r.getController = function(adapter) {
						var r = adapter.getItem(-1);
						r.self = adapter;
						return r;
					}
					return r;
				})(), //SampleListAdapter(from@projectXero <GPLv3>)
				SimpleListAdapter: (function() {
					var r = function(arr, maker, binder, params) {
						//arr是列表数组，maker(holder, params)生成基础view，binder(holder, element, index, array, params)修改view使其实现指定的界面
						var src = arr,
							holders = [],
							dso = [],
							controller;
						controller = new r.Controller(src, holders, dso, maker, binder, params);
						return new G.ListAdapter({
							getCount: function() {
								return src.length;
							},
							getItem: function(pos) {
								if (pos == -1) return controller;
								return src[pos];
							},
							getItemId: function(pos) {
								return pos;
							},
							getItemViewType: function(pos) {
								return 0;
							},
							getView: function(pos, convert, parent) {
								var holder;
								try {
									if (!convert || !(convert.getTag() in holders)) {
										holder = {};
										convert = maker(holder, params);
										holder.self = convert;
										convert.setTag(holders.length.toString());
										holders.push(holder);
									}
									holder = holders[convert.getTag()];
									holder.pos = parseInt(pos);
									binder(holder, src[pos], parseInt(pos), src, params);
									return convert;
								} catch (e) {
									var a = new G.TextView(ctx);
									a.setText(e + "\n" + e.stack);
									GUI.Widget.showTextDialog(e);
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "Util.SLA$Controller.getView", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
									return a;
								}
							},
							getViewTypeCount: function() {
								return 1;
							},
							hasStableIds: function() {
								return true;
							},
							isEmpty: function() {
								return src.length === 0;
							},
							areAllItemsEnabled: function() {
								return true;
							},
							isEnabled: function(pos) {
								return pos >= 0 && pos < src.length;
							},
							registerDataSetObserver: function(p) {
								if (dso.indexOf(p) >= 0) return;
								dso.push(p);
							},
							unregisterDataSetObserver: function(p) {
								var i = dso.indexOf(p);
								if (p >= 0) dso.splice(i, 1);
							}
						});
					}
					r.Controller = function(array, holders, dso, maker, binder, params) {
						this.array = array;
						this.holders = holders;
						this.dso = dso;
						this.maker = maker;
						this.binder = binder;
						this.params = params;
					}
					r.Controller.prototype = {
						clearHolder: function() {
							var i;
							for (i in this.holders) {
								this.holders[i].self.setTag("");
							}
							this.holders.length = 0;
							this.notifyChange();
						},
						getHolder: function(view) {
							return this.holders[view.getTag()];
						},
						notifyChange: function() {
							var o = this;
							G.ui(function() {
								o.dso.forEach(function(e) {
									if (e) e.onChanged();
								});
							});
						},
						notifyInvalidate: function() {
							this.dso.forEach(function(e) {
								if (e) e.onInvalidated();
							});
						},
						rebind: function(pos) {
							var i;
							for (i in this.holders) {
								if (this.holders[i].pos == pos) {
									this.binder(this.holders[i], this.array[pos], parseInt(pos), this.array, this.params);
								}
							}
						},
						setArray: function(a) {
							if (this.array != a) {
								this.array.length = 0;
								for (var i in a) this.array.push(a[i]);
							}
							this.notifyChange();
						},
						add: function(ele, isNotify) {
							this.array.push(ele);
							if (isNotify) this.notifyChange();
						},
						get: function(index) {
							return this.array[index];
						},
						getAll: function() {
							return this.array;
						},
					}
					r.getController = function(adapter) {
						var r = adapter.getItem(-1);
						r.self = adapter;
						return r;
					}
					return r;
				})(),
			},
		};

		NetworkInterface = {
			module: "NetworkInterface",
			getInputStream: function(url, headers) {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, NetworkInterface.module, "getInputStream", arguments);
				try {
					var urlConnect = new java.net.URL(url);
					var connection = urlConnect.openConnection();
					if (headers != null) {
						for (var i in headers) {
							connection.setRequestProperty(headers[i][0], headers[i][1]);
						}
					}
					connection.setDoInput(true);
					connection.connect();
					return [connection.getContentLength(), connection.getInputStream()];
				} catch (e) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, NetworkInterface.module, "getInoutStream", (function(sarg) {
						var arr = [];
						arr.push(ConsoleEmulator.traceErrorStack(e));
						for (var i in sarg) {
							arr.push(sarg[i])
						};
						return arr;
					}(arguments)));
					err(e);
					return "";
				}
			},
			get: function(url) {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, NetworkInterface.module, "get", arguments);
				try {
					var result = "";
					var urlConnect = new java.net.URL(url);
					var connection = urlConnect.openConnection();
					connection.setDoInput(true);
					connection.setUseCaches(false);
					connection.connect();
					var charset = "UTF-8";
					var pattern = java.util.regex.Pattern.compile("charset=\\S*");
					var matcher = pattern.matcher(connection.getContentType());
					if (matcher.find()) {
						charset = matcher.group().replace("charset=", "");
					}
					var bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream(), charset));
					var line;
					while ((line = bufferedReader.readLine()) != null) {
						result += (line += "\n");
					}
					bufferedReader.close();
					return result;
				} catch (e) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, NetworkInterface.module, "get", (function(sarg) {
						var arr = [];
						arr.push(ConsoleEmulator.traceErrorStack(e));
						for (var i in sarg) {
							arr.push(sarg[i])
						};
						return arr;
					}(arguments)));
					return "";
				}
			},
			isNetworkAvailable: function s() {
				s.con = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
				if (s.con) {
					s.dtl = s.con.getAllNetworkInfo();
					for (var i in s.dtl) {
						if (s.dtl[i].getState() == android.net.NetworkInfo.State.CONNECTED) {
							return true;
						}
					}
				}
				return false;
			},
		};

		//这是API
		NeteaseCloudMusic = {};

		APlayer = {
			module: "AudioPlayer",
			ap: null,

			duration: 0,
			inputSteamSize: 0,

			nowSongId: 0,
			mode: 1,

			isPlaying: false,
			isBufferCompleted: false,

			onfinishlistener: function() {},

			visualizer: null,

			initialize: function() {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, APlayer.module, "initialize");
				this.ap = new AudioPlayer();
				this.ap.setLibraryDictionary(DataCollector.libFolder);
				this.ap.setCallBack(new AudioPlayer.CallBack({
					onCall: function(msg) {
						ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, APlayer.module, "onCall", arguments);
					},
					onPlay: function(currentDur) {
						if (GUI.PopupWindow.isDisplayingWindow && GUI.PopupWindow.nowWindow == "PlaySong") {
							G.ui(function() {
								currentDur = Math.round(APlayer.duration * (currentDur / APlayer.inputStreamSize));
								try {
									if (!GUI.PopupWindow.Window.PlaySong.bartouched) GUI.PopupWindow.Window.PlaySong.bar.setProgress(currentDur);
								} catch (e) {
									ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, APlayer.module, "onPlay", (function(sarg) {
										var arr = [];
										arr.push(ConsoleEmulator.traceErrorStack(e));
										for (var i in sarg) {
											arr.push(sarg[i])
										};
										return arr;
									}(arguments)));
								}
								var sec = Math.round(currentDur / 1000) % 60;
								var min = (Math.round(currentDur / 1000) - sec) / 60;
								GUI.PopupWindow.Window.PlaySong.nowtime.setText(min + ":" + sec);
							});
						}
					},
					onFinish: function() {
						APlayer.destroy();
						APlayer.onfinishlistener();
						//重播
						APlayer.play(APlayer.nowSongId);
					},
					onGainAudioSessionId: function(sid) {
						//APlayer.refreashVisualizer(sid);
					},
				}));
				this.ap.setDownloadListener(new AudioPlayer.DownloadListener({
					onPerDownload: function(len) {
						if (GUI.PopupWindow.isDisplayingWindow && GUI.PopupWindow.nowWindow == "PlaySong") {
							G.ui(function() {
								GUI.PopupWindow.Window.PlaySong.bar.setSecondaryProgress(Math.round(APlayer.duration * (len / APlayer.inputStreamSize)));
							});
						}
					},
					onDownloadFinish: function() {
						APlayer.isBufferCompleted = true;
						if (GUI.PopupWindow.isDisplayingWindow && GUI.PopupWindow.nowWindow == "PlaySong") {
							G.ui(function() {
								GUI.PopupWindow.Window.PlaySong.bar.setSecondaryProgress(APlayer.duration);
							});
						}
					},
				}));
			},
			play: function(songid) {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, APlayer.module, "play");
				if (songid == APlayer.nowSongId) {
					if (APlayer.getPlayState() == G.AudioTrack.PLAYSTATE_PAUSED) {
						APlayer.ap.o_play();
					} else if (APlayer.getPlayState() == G.AudioTrack.PLAYSTATE_STOPPED) {
						APlayer.destroy();
						APlayer.play(songid);
					} else if (APlayer.getPlayState() == -1) {
						APlayer.destroy();
						APlayer.play(songid);
					}
				} else {
					if (APlayer.isPlaying || APlayer.getPlayState() == -1) {
						APlayer.destroy();
					}
					if (NetworkInterface.isNetworkAvailable()) {
						try {
							var url = DataCollector.Loader.load(DataCollector.Loader.Type.SONG_MP3U, songid).data[0].url;
							var isInfo = NetworkInterface.getInputStream(url, NeteaseCloudMusic.getSongInputStreamAvaliableHeader(url.split("/")[2]));
							var song = DataCollector.Loader.load(DataCollector.Loader.Type.SONG, songid).songs[0];
							APlayer.ap.setMode(APlayer.mode = 1);
							APlayer.ap.setInput(isInfo[1]);
							APlayer.ap.setInputStreamSize(APlayer.inputStreamSize = isInfo[0]);
							APlayer.ap.setDuration(APlayer.duration = GUI.PopupWindow.Window.PlaySong.duration = song.duration);
							APlayer.ap.setBufferPath(DataCollector.tempFolder + song.id + ".tmp");
							APlayer.isPlaying = true;
							APlayer.nowSongId = songid;
							APlayer.ap.start();
						} catch (e) {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, APlayer.module, "play", ["因为网络问题无法播放音乐"]);
							GUI.Widget.showTopToast("无法播放音乐，请连接网络，详细信息: \n" + e + "\n" + e.stack);
						}
					} else {
						var f;
						if ((f = new java.io.File(DataCollector.tempFolder + songid + ".tmp")).exists()) {
							var is = DataCollector.IO.read(DataCollector.tempFolder + songid + ".tmp", DataCollector.IO.ReadType.STREAM);
							APlayer.ap.setMode(APlayer.mode = 2);
							APlayer.ap.setInput(is);
							APlayer.ap.setInputStreamSize(APlayer.inputStreamSize = f.length());
							APlayer.ap.setBufferPath(f);
							var mp = new G.MediaPlayer();
							mp.setDataSource(f);
							mp.prepare();
							APlayer.ap.setDuration(APlayer.duration = GUI.PopupWindow.Window.PlaySong.duration = mp.getDuration());
							mp = null;
							APlayer.isPlaying = true;
							APlayer.nowSongId = songid;
							APlayer.ap.start();
						} else {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, APlayer.module, "play", ["因为缓存问题无法播放音乐"]);
							GUI.Widget.showTopToast("无法缓存音乐，请连接网络");
						}
					}
				}
			},
			destroy: function() {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, APlayer.module, "destroy");
				try {
					this.ap.recycle();
				} catch (e) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, APlayer.module, "destroy", (function(sarg) {
						var arr = [];
						arr.push(ConsoleEmulator.traceErrorStack(e));
						for (var i in sarg) {
							arr.push(sarg[i])
						};
						return arr;
					}(arguments)));
				};
				this.isPlaying = false;
				this.isBufferCompleted = false;
				this.duration = 0;
				this.inputStreamSize = 0;
				this.nowSongId = 0;
				this.mode = 1;
			},
			pause: function() {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, APlayer.module, "pause");
				this.ap.o_pause();
			},
			getPlayState: function() {
				try {
					return this.ap.getPlayState();
				} catch (e) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, APlayer.module, "getPlayState", (function(sarg) {
						var arr = [];
						arr.push(ConsoleEmulator.traceErrorStack(e));
						for (var i in sarg) {
							arr.push(sarg[i])
						};
						return arr;
					}(arguments)));
					this.destroy();
					return G.AudioTrack.PLAYSTATE_STOPPED;
				}
			},
			seek: function(progress) {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, APlayer.module, "seek", arguments);
				if (!GUI.PopupWindow.Window.PlaySong.bartouched) this.ap.seekTo(progress);
			},
			refreashVisualizer: function(sid) {
				try {
					this.visualizer.setEnabled(false);
				} catch (e) {};
				this.visualizer = null;
				this.visualizer = new G.Visualizer(sid);
				this.visualizer.setCaptureSize(G.Visualizer.getCaptureSizeRange()[1]);
				this.visualizer.setDataCaptureListener(new G.Visualizer.OnDataCaptureListener() {
					onWaveFormDataCapture: function(visualizer, bytes) {
						if (GUI.PopupWindow.isDisplayingWindow && GUI.PopupWindow.nowWindow == "PlaySong" && GUI.PopupWindow.Window.PlaySong.visualizerinitialized) {
							G.ui(function() {
								GUI.PopupWindow.Window.PlaySong.visview.updateVisualizer(bytes);
							});
						}
					},
					onFftDataCapture: function(visualizer, bytes, samplingRate) {},
				}, G.Visualizer.getMaxCaptureRate(), true, false);
				this.visualizer.setEnabled(true);
			},
		};

		DataCollector = {
			module: "DataCollector",

			//Data Folder
			dataFolder: android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/.stageguard/test/",


			iconFolder: null,
			tempFolder: null,
			songFolder: null,
			detailFolder: null,
			pictureFolder: null,
			libFolder: null,

			userData: null,
			settingConfiguration: null,

			i_resources: null,
			i_update: null,
			i_eval: null,
			i_api: null,

			resources: {},

			user: null,

			/*mad_loaded: null,
			nativestackblurloaded: null,*/

			S_CONFIG: {
				suspendedCoordinate: {
					x: G.width * 0.98,
					y: G.height * 0.25,
				},
				anim: true,
				animSpeed: 1.0,
				fadeInAnim: GUI.Configuration.FadeInAnimType.alpha,
				rippleshape: "rect",
				wTheme: "white",
				log: false,
				winalpha: 1,
				searchsuggest: true,
				maxLogStack: 30,
			},

			USER_DATA: {
				Account: {
					account_number: "",
					password: "",
				},
				search_history: {

				},
				playlist: {

				}
			},

			textColor: {
				black: G.Color.argb(255, 0, 0, 0),
				white: G.Color.argb(255, 255, 255, 255),
			},
			hintTextColor: {
				black: G.Color.argb(125, 0, 0, 0),
				white: G.Color.argb(125, 255, 255, 255),
			},
			themeColor: {
				black: G.Color.argb(255, 62, 62, 62),
				white: G.Color.argb(255, 240, 242, 248),
			},
			deepColor: {
				black: G.Color.argb(255, 46, 46, 46),
				white: G.Color.argb(255, 230, 232, 238),
			},

			toRes: function(name) {
				return this.resources["ic_" + name + "_" + (this.S_CONFIG.wTheme == "black" ? "white" : "black") + "_48dp"];
			},
			toBmp: function(name) {
				return this.resources[name];
			},
			toTextColor: function(fan) {
				if (fan) {
					return this.textColor[this.S_CONFIG.wTheme == "black" ? "white" : "black"];
				} else {
					return this.textColor[this.S_CONFIG.wTheme];
				}
			},
			toHintTextColor: function(fan) {
				if (fan) {
					return this.hintTextColor[this.S_CONFIG.wTheme == "black" ? "white" : "black"];
				} else {
					return this.hintTextColor[this.S_CONFIG.wTheme];
				}
			},
			toThemeColor: function(fan) {
				if (fan) {
					return this.themeColor[this.S_CONFIG.wTheme == "black" ? "white" : "black"];
				} else {
					return this.themeColor[this.S_CONFIG.wTheme];
				}
			},
			toDeepThemeColor: function(fan) {
				if (fan) {
					return this.deepColor[this.S_CONFIG.wTheme == "black" ? "white" : "black"];
				} else {
					return this.deepColor[this.S_CONFIG.wTheme];
				}
			},

			IO: {
				ReadType: {
					STREAM: (233 + 5),
					STRING: (233 + 3),
				},
				create: function(storage) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "IO.create", arguments);
					storage = storage.split(java.io.File.separator);
					if ((/\./i).test(storage[storage.length - 1]) && !(/^\./i).test(storage[storage.length - 1])) {
						var path = "";
						for (var i in storage) path += ((i == storage.length - 1) ? ("") : (storage[i]) + ((i == storage.length - 1) ? ("") : (java.io.File.separator)));
						var file = path + storage[storage.length - 1];
						var pathF = new java.io.File(path);
						if (!pathF.isDirectory() || !pathF.exists()) pathF.mkdirs();
						var fileF = new java.io.File(file);
						if (!fileF.isFile() || !fileF.exists()) fileF.createNewFile();
					} else {
						var path = "";
						for (var i in storage) path += ((storage[i]) + ((i == storage.length - 1) ? ("") : (java.io.File.separator)));
						var file = new java.io.File(path);
						if (!file.isDirectory() || !file.exists()) file.mkdirs();
					}
				},
				delete: function(storage) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "IO.delete", arguments);
					var path = new java.io.File(storage);
					if (path.exists()) path.delete();
				},
				read: function(path, mode) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "IO.read", arguments);
					var file = new java.io.File(path);
					if (file.exists()) {
						try {
							var inputStream = new java.io.FileInputStream(file);
							if (mode == this.ReadType.STREAM) {
								return inputStream;
								return new java.io.ByteArrayInputStream(byteArray);
							} else {
								var inputStreamReader = new java.io.InputStreamReader(inputStream);
								var bufferedReader = new java.io.BufferedReader(inputStreamReader);
								var stringBuffer = new java.lang.StringBuffer();
								var line = null;
								while ((line = bufferedReader.readLine()) != null) {
									stringBuffer.append(line);
									stringBuffer.append("\n");
								}
								inputStreamReader.close();
								return stringBuffer.toString();
							}
						} catch (error) {
							GUI.Widget.showTopToast(error + " (" + error.fileName + "#" + error.lineNumber + ")\n" + error.stack);
							return "";
						}
					} else {
						ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, DataCollector.module, "IO.read", ["文件不存在"]);
						return "";
					}
				},
				saveByString: function(path, string, isCover) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "IO.saveByString", arguments);
					try {
						var file = new java.io.File(path);
						if (!file.exists()) {
							file.createNewFile();
							isCover = true;
						}
						if (isCover == false) {
							return;
						}
						var fileWriter = new java.io.FileWriter(file);
						fileWriter.write(string);
						fileWriter.close();
					} catch (error) {
						ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, DataCollector.module, "IO.saveByString", (function(sarg) {
							var arr = [];
							arr.push(ConsoleEmulator.traceErrorStack(e));
							for (var i in sarg) {
								arr.push(sarg[i])
							};
							return arr;
						}(arguments)));
					}
				},
				saveByInputStream: function(path, inputStream, isCover, isInputStreamClose) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "IO.saveByInputStream", arguments);
					try {
						var file = new java.io.File(path);
						if (!file.exists()) {
							file.createNewFile();
							isCover = true;
						}
						if (isCover == false) {
							if (isInputStreamClose) inputStream.close();
							return;
						}
						var buffer = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
						var outputStream = new java.io.FileOutputStream(file);
						var len = -1;
						while ((len = inputStream.read(buffer)) != -1) {
							outputStream.write(buffer, 0, len);
						}
						if (isInputStreamClose) inputStream.close();
						outputStream.flush();
						outputStream.close();
					} catch (error) {
						ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, DataCollector.module, "IO.saveByInputStream", (function(sarg) {
							var arr = [];
							arr.push(ConsoleEmulator.traceErrorStack(e));
							for (var i in sarg) {
								arr.push(sarg[i])
							};
							return arr;
						}(arguments)));
					}
				},
				appendBytes: function(path, appendString) {
					var randomAccessFile = new java.io.RandomAccessFile(path, "rw");
					randomAccessFile.seek(randomAccessFile.length());
					randomAccessFile.write(java.lang.String(appendString).getBytes());
					randomAccessFile.close();
				}
			},

			clearAllData: function() {
				var d1, d2, d3, d4, d5, d6;
				for (var i in d1 = java.io.File(this.iconFolder).listFiles()) this.IO.delete(d1[i]);
				for (var i in d2 = java.io.File(this.libFolder).listFiles()) this.IO.delete(d2[i]);
				for (var i in d3 = java.io.File(this.tempFolder).listFiles()) this.IO.delete(d3[i]);
				for (var i in d4 = java.io.File(this.songFolder).listFiles()) this.IO.delete(d4[i]);
				for (var i in d5 = java.io.File(this.pictureFolder).listFiles()) this.IO.delete(d5[i]);
				for (var i in d6 = java.io.File(this.detailFolder).listFiles()) this.IO.delete(d6[i]);
				this.IO.delete(this.userData);
				this.IO.delete(this.settingConfiguration);
				this.IO.delete(this.resourceList);
				this.IO.delete(this.iconFolder);
				this.IO.delete(this.libFolder);
				this.IO.delete(this.tempFolder);
				this.IO.delete(this.songFolder);
				this.IO.delete(this.pictureFolder);
				this.IO.delete(this.detailFolder);
				this.IO.delete(this.dataFolder);
			},

			Loader: {
				Type: {
					SONG: 1,
					SONG_COMMENTS: 2,
					SONG_PICTURE: 3,
					SONG_MP3U: 4,
					SONG_LYRIC: 5,
					DAILY_SONG: 6,
					ALBUM: 7,
					ALBUM_COMMENTS: 8,
					ALBUM_PICTURE: 9,
					ARTIST: 10,
					USER: 11,
					PLAYLIST: 12,
					USER_PLAYLIST: 13,

				}, //private operation
				pri_load_detail: function(f, forAPI) {
					if (NetworkInterface.isNetworkAvailable()) {
						var data = NeteaseCloudMusic.API[forAPI](arguments[2], arguments[3], arguments[4], arguments[5]);

						DataCollector.IO.saveByString(f, String(data), true);
						return JSON.parse(String(data));
					} else {
						var data = DataCollector.IO.read(f, DataCollector.IO.ReadType.STRING);
						if (data == "") {
							GUI.Widget.showTopToast("缓存加载失败", "未连接网络，请检查网络设置");
							DataCollector.IO.delete(f);
							return {};
						} else {
							try {
								return JSON.parse(String(data));
							} catch (e) {
								GUI.Widget.showTopToast("本地缓存加载失败", e);
								DataCollector.IO.delete(f);
								return {};
							}
						}
					}
				},
				pri_load_image: function(f, imgurl) {
					var img;
					try {
						if (NetworkInterface.isNetworkAvailable()) {
							var imgStream = NetworkInterface.getInputStream(imgurl)[1];
							DataCollector.IO.saveByInputStream(f, imgStream, true, true);
							img = G.BitmapFactory.decodeFile(f);
						} else {
							img = G.BitmapFactory.decodeFile(f);
						}
						return img;
					} catch (e) {
						GUI.Widget.showTopToast("缓存加载失败", "图片缓存加载失败，请连接网络后重试");
						DataCollector.IO.delete(f);
						return G.Bitmap.createBitmap(1, 1, G.Bitmap.Config.ARGB_8888);
					}
				},

				load: function(type) {
					ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "Cache.load", arguments);
					switch (type) {
						case this.Type.SONG:
							return this.pri_load_detail(DataCollector.detailFolder + "song_" + arguments[1] + ".dtl", "detail_song", arguments[1]);
						case this.Type.SONG_COMMENTS:
							return this.pri_load_detail(DataCollector.detailFolder + "song_comments_" + arguments[1] + "(" + (arguments[3] - 1) * arguments[2] + "-" + arguments[2] * arguments[3] + ")" + ".dtl", "detail_song_comments", arguments[1], arguments[2], arguments[3]);
						case this.Type.SONG_MP3U:
							return this.pri_load_detail(DataCollector.detailFolder + "song_mp3u_" + arguments[1] + ".dtl", "detail_song_mp3", arguments[1], arguments[2]);
						case this.Type.SONG_LYRIC:
							return this.pri_load_detail(DataCollector.detailFolder + "song_lyric_" + arguments[1] + ".dtl", "detail_song_lyric", arguments[1]);
						case this.Type.ALBUM:
							return this.pri_load_detail(DataCollector.detailFolder + "album_" + arguments[1] + ".dtl", "detail_album", arguments[1]);
						case this.Type.ALBUM_COMMENTS:
							return this.pri_load_detail(DataCollector.detailFolder + "album_comments_" + arguments[1] + "(" + (arguments[3] - 1) * arguments[2] + "-" + arguments[2] * arguments[3] + ")" + ".dtl", "detail_album_comments", arguments[1], arguments[2], arguments[3]);
						case this.Type.ARTIST:
							return this.pri_load_detail(DataCollector.detailFolder + "artist_" + arguments[1] + ".dtl", "detail_artist", arguments[1]);
						case this.Type.PLAYLIST:
							return this.pri_load_detail(DataCollector.detailFolder + "playlist_" + arguments[1] + ".dtl", "detail_playlist", arguments[1]);
						case this.Type.USER:
							return this.pri_load_detail2(DataCollector.detailFolder + "user_" + arguments[1] + ".dtl", "detail_user", arguments[1]);
						case this.Type.DAILY_SONG:
							return this.pri_load_detail(DataCollector.detailFolder + "daily_song.dtl", "daily_song");
						case this.Type.SONG_PICTURE:
							{
								var imgurl = DataCollector.Loader.load(DataCollector.Loader.Type.SONG, arguments[1]).songs[0].album.picUrl;
								return this.pri_load_image(DataCollector.pictureFolder + "song_" + arguments[1] + ".pic", imgurl);
								break;
							}
						case this.Type.ALBUM_PICTURE:
							{
								var imgurl = DataCollector.Loader.load(DataCollector.Loader.Type.ALBUM, arguments[1]).album.picUrl;
								return this.pri_load_image(DataCollector.pictureFolder + "album_" + arguments[1] + ".pic", imgurl);
								break;
							}
						case this.Type.USER_PLAYLIST:
							return this.pri_load_detail2(DataCollector.detailFolder + "user_playlist_" + arguments[1] + ".dtl", "user_playlist", arguments[1]);
					}
				},
			},

			loadConfiguration: function(pd) {
				var load = function(o, json, p) {
					for (var i in json) {
						if (typeof(json[i]) == "object") {
							load(o, json[i], p + "." + i);
						} else {
							eval(o + p + "[\"" + i + "\"] = json[i];");
						}
					}
				}
				//ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, "Loading User Configurations...");
				pd.setText("正在加载配置文件...");
				//java.lang.Thread.sleep(200);
				var data = this.IO.read(this.settingConfiguration, this.IO.ReadType.STRING);
				if (data != "") {
					load("DataCollector.S_CONFIG", JSON.parse(data), "");
				} else {
					this.IO.saveByString(this.settingConfiguration, JSON.stringify(this.S_CONFIG), true);
				}
				var ud = this.IO.read(this.userData, this.IO.ReadType.STRING);
				if (ud != "") {
					load("DataCollector.USER_DATA", JSON.parse(ud), "");
				} else {
					this.IO.saveByString(this.userData, JSON.stringify(this.USER_DATA), true);
				}
				this.autoSave();
			},

			loadAPI: function(pd) {
				pd.setText("正在加载云音乐API");
				//test mode
				//eval(this.IO.read(this.i_api, this.IO.ReadType.STRING));

				var api = NetworkInterface.get("https://gitee.com/eskarton/NeteaseCloudMusic.js/raw/master/JSData/api.js");
				if (api != "") {
					this.IO.saveByString(this.i_api, api, true);
					eval(api); //加载到NeteaseCloudMusic里
				} else {
					try {
						eval(this.IO.read(this.i_api, this.IO.ReadType.STRING));
					} catch (error) {
						GUI.Widget.showTextDialog("网易云音乐API加载失败\n这意味着您将无法继续操作\n\n" + error + "\n\n点击\"关闭\"退出", function() {
							java.lang.System.exit(0);
						}, true);
						java.lang.Thread.sleep(99999);
					}
				}
			},

			loadResources: function(pd) {
				var host = "https://gitee.com/eskarton/NeteaseCloudMusic.js/raw/master/JSData/";
				//错误提示
				var err = function(possible_reason, e) {
					GUI.Widget.showTextDialog("资源加载失败！\n这意味着您可能无法继续操作\n\n可能原因：\n" + possible_reason + "\n\n点击\"关闭\"退出", function() {
						if (e) java.lang.System.exit(0);
					}, true);
					if (e) java.lang.Thread.sleep(99999);
				}
				//下载资源
				var download = function(list) {
					pd.setText("正在下载缺失的资源");
					var errs = "";
					for (var i in list) {
						pd.setText("正在下载/更新资源(剩余" + (list.length - i) + "项)");
						var inputStream = NetworkInterface.getInputStream(list[i][0])[1];
						if (inputStream != "") {
							DataCollector.IO.saveByInputStream(list[i][1], inputStream, true, true);
						} else {
							errs += (list[i][0] + "\n");
						}
					}
					if (errs != "") GUI.Widget.showTextDialog("有一些资源下载失败！可能会导致资源加载失败\n\n" + errs);
				}

				//加载过程
				//1.加载资源列表
				pd.setText("正在加载资源列表");

				var resdata = NetworkInterface.get(host + "resources.json");
				var l_resdata = this.IO.read(this.i_resources, this.IO.ReadType.STRING);

				if (resdata != "") resdata = JSON.parse(resdata);
				if (l_resdata != "") try {
					l_resdata = JSON.parse(l_resdata);
				} catch (e) {
					l_resdata = resdata;
				}
				if (resdata == "") resdata = l_resdata;

				//资源列表加载失败了
				if (resdata == "" && l_resdata == "") err("这是您首次加载JS，但是您未联网\n本地资源列表被篡改", true);
				//2.校验资源完整性
				pd.setText("正在校验资源完整性");
				var ltd = [],
					icons = resdata.icons,
					libs = resdata.libraries,
					l_libs = l_resdata.libraries;
				for (var i in icons) { //检索图标资源
					if (!(new java.io.File(DataCollector.iconFolder + icons[i])).exists()) {
						ltd.push([host + "resources/" + icons[i], DataCollector.iconFolder + icons[i]]);
					}
				}
				for (var i in libs) { //检索库资源
					var isCheckVersion = true;
					if (!(new java.io.File(DataCollector.libFolder + libs[i].lib)).exists()) { //检查库文件是否存在
						ltd.push([host + "libraries/" + libs[i].lib, DataCollector.libFolder + libs[i].lib]);
						isCheckVersion = false;
					}

					for (var i2 in l_libs) {
						if (isCheckVersion && libs[i].no == l_libs[i].no && libs[i].version > l_libs[i].version) { //匹配库信息并检查版本
							ltd.push([host + "libraries/" + libs[i].lib, DataCollector.libFolder + libs[i].lib]);
						}
					}

					if (libs[i].files) {
						for (var f in libs[i].files) { //库文件
							if (!(new java.io.File(DataCollector.libFolder + libs[i].files[f])).exists()) {
								ltd.push([host + "libraries/" + libs[i].files[f], DataCollector.libFolder + libs[i].files[f]]);
							}
						}
					}
					if (libs[i].native_part) { //SO库文件
						//检查CPU是否支持
						var b = false;
						for (var is in libs[i].native_part.supported)
							if (android.os.Build.CPU_ABI == libs[i].native_part.supported[is]) b = true;
						if (!b) err("您的设备不支持库" + libs[i].name + "\n的加载\n此设备CPU_ABI值: " + android.os.Build.CPU_ABI + "\n已支持的: " + libs[i].native_part.supported, true);
						if (!(new java.io.File(DataCollector.libFolder + libs[i].native_part.lib + "_" + android.os.Build.CPU_ABI + ".so")).exists()) {
							ltd.push([host + "libraries/" + libs[i].native_part.lib + "_" + android.os.Build.CPU_ABI + ".so", DataCollector.libFolder + libs[i].native_part.lib + "_" + android.os.Build.CPU_ABI + ".so"]);
						}
					}
				}
				//下载缺失的资源
				if (ltd.length) download(ltd);
				//3.加载图标资源
				pd.setText("正在加载图标资源");
				for (var i in icons) {
					DataCollector.resources[(icons[i].split("."))[0]] = G.Bitmap.createBitmap(G.BitmapFactory.decodeFile(DataCollector.iconFolder + icons[i]));
					java.lang.Thread.sleep(2);
				}
				//4.加载库资源
				pd.setText("正在加载库");
				for (var i in libs) {
					var native = false;
					if (libs[i].type == "native") native = true;
					var context = org.mozilla.javascript.Context.getCurrentContext();
					var app_dex = ctx.getDir("dex", android.app.Activity.MODE_PRIVATE).getAbsolutePath();
					var app_libs = native ? ctx.getDir("libs", android.app.Activity.MODE_PRIVATE).getAbsolutePath() : null;
					var native_so = DataCollector.libFolder + libs[i].native_part.lib + "_" + android.os.Build.CPU_ABI + ".so";
					if (native) {
						var fip = new java.io.FileInputStream(native_so).getChannel();
						var fop = new java.io.FileOutputStream(new java.io.File(app_libs, libs[i].native_part.lib + ".so")).getChannel();
						fip.transferTo(0, fip.size(), fop);
						fip.close();
						fop.close();
					}
					var dcl = new Packages.dalvik.system.DexClassLoader(DataCollector.libFolder + libs[i].lib, app_dex, app_libs, context.getApplicationClassLoader());
					eval("scope." + libs[i].toScope + " = context.getWrapFactory().wrapJavaClass(context, scope, dcl.loadClass(libs[i].class));");
				}
				this.IO.saveByString(this.i_resources, JSON.stringify(resdata, "", 4), true);
			},

			userLogin: function(acc, pwd) {
				G.th(function() {
					try {
						if (NetworkInterface.isNetworkAvailable()) {
							var udata = NeteaseCloudMusic.API.login(acc, pwd);
							if ((/"code":200/gi).test(udata)) {
								DataCollector.user = JSON.parse(udata);
								GUI.Widget.showTopToast("登录成功！");
								ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "Login Successful");
							} else {
								GUI.Widget.showTopToast("登录失败，请检查您输入的账号和密码是否正确\n或者因为您短时间登录次数过多，请过一段时间后重试");
								ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "Login Failed(Wrong pwd)");
							}
						} else {
							GUI.Widget.showTopToast("登录失败，请检查网络连接");
							ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "Login Failed(Network)");
						}
					} catch (e) {
						print(e);
					}
				}).start();
			},

			autoSave: function() {
				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "Start AutoSave Thread");
				var t = new G.th(function() {
					java.lang.Thread.sleep(10000);
					var fw1 = new java.io.FileWriter(DataCollector.settingConfiguration);
					fw1.write(JSON.stringify(DataCollector.S_CONFIG));
					fw1.close();
					var fw2 = new java.io.FileWriter(DataCollector.userData);
					fw2.write(JSON.stringify(DataCollector.USER_DATA));
					fw2.close();
					t.run();
				});
				t.start();
			},

			initialize: function() {

				ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, DataCollector.module, "DataCollector Module is initializing...");

				var pd = GUI.Widget.showProgressDialog(null, true);

				this.IO.create(this.iconFolder = this.dataFolder + "icons/");
				this.IO.create(this.tempFolder = this.dataFolder + "temp/");
				this.IO.create(this.songFolder = this.dataFolder + "songs/");
				this.IO.create(this.detailFolder = this.dataFolder + "details/");
				this.IO.create(this.pictureFolder = this.dataFolder + "pictures/");
				this.IO.create(this.libFolder = this.dataFolder + "libraries/");
				this.IO.create(this.userData = this.dataFolder + "userdata.cfg");
				this.IO.create(this.settingConfiguration = this.dataFolder + "setting.cfg");
				this.i_resources = this.dataFolder + "resources.json";
				this.i_update = this.dataFolder + "update.json";
				this.i_eval = this.dataFolder + "eval.js";
				this.i_api = this.dataFolder + "api.js";

				//加载设置和用户数据
				this.loadConfiguration(pd);
				//加载API
				this.loadAPI(pd);
				//加载各种东西
				this.loadResources(pd);
				//用户登陆(如果有账号和密码)
				if (this.USER_DATA.Account.account_number != "" && this.USER_DATA.Account.password != "") {
					this.userLogin(this.USER_DATA.Account.account_number, this.USER_DATA.Account.password);
				}

				//针对autojs返回
				if (host == (Host.AUTOJS_UI || Host.AUTOJS_NONUI)) ctx.moveTaskToBack(true);

				pd.close();
				if (pd.cancelled) return;
				pd = null;

			},

			runOnlineCode: function() {
				try {
					var evaluator = NetworkInterface.get("https://gitee.com/eskarton/NeteaseCloudMusic.js/raw/master/JSData/eval.js");
					eval(evaluator);
					this.IO.saveByString(this.i_eval, evaluator, true);
				} catch (e) {
					err(e);
					eval(this.IO.read(this.eval, this.IO.ReadType.STRING));
				}

			},

			setClipboardText: function(text) {
				return ctx.getSystemService(ctx.CLIPBOARD_SERVICE).setPrimaryClip(android.content.ClipData.newPlainText("", text));
			},
		};

		var __ms = (new Date()).getTime() - __start_load;
		ConsoleEmulator.log(ConsoleEmulator.LogType.CONSOLE_MSG, "RhinoNeteaseCloudMusic.js is sucessfully loaded.");
		ConsoleEmulator.log(ConsoleEmulator.LogType.CONSOLE_MSG, "Time spent: " + __ms + "ms.");

		DataCollector.initialize();
		APlayer.initialize();

		GUI.PopupWindow.addWindow({
			name: "GetStart",
			title: "Netease Cloud Music",

			search: "",

			views: function(self, current) {

				self.issss = false;
				self.shouldshow = false;

				self.scroll = GUI.Widget.ScrollLayout(-1, -2);
				self.linear = GUI.Widget.LinearLayout(-1, -2, "V");
				self.width = GUI.Configuration.width - G.dp * 15;
				self.topview = GUI.Widget.View(-1, G.dp * 4);
				self.linear.addView(self.topview);
				self.searchlin = GUI.Widget.LinearLayout(-1, -2, "H");
				self.searchlin.setPadding(G.dp * 7.5, G.dp * 5, G.dp * 7.5, G.dp * 5);
				self.searcheditlin = GUI.Widget.RelativeLayout(self.width - G.dp * 45, G.dp * 45);
				self.searchedit = GUI.Widget.EditText(-1, -1, current.search, "搜索你喜欢的歌曲/歌单/专辑/...", function(v, t) {
					self.shouldshow = true;
					return false;
				}, function(string, start, before, count) {
					if (!self.haveText && self.searchedit.getText() != "") {
						self.haveText = true;
						GUI.Util.objAnim(self.searchclear, 100, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}, ], function() {
							self.searchclear.setAlpha(1);
						});
					} else if (self.haveText && self.searchedit.getText() == "") {
						self.haveText = false;
						GUI.Util.objAnim(self.searchclear, 100, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 1,
							end: 0
						}, ], function() {
							self.searchclear.setAlpha(0);
						});
					}
					G.th(function() {
						try {
							if (self.searchedit.getText() == "") {
								self.ss_dismiss();
								return;
							}
							var data = JSON.parse(String(NeteaseCloudMusic.API.search_suggest(String(self.searchedit.getText())))).result.songs;

							if (data.length != 0) {
								if (!self.issss) {
									self.showss(0, data);
								} else {
									self.showss(1, data);
								}
							} else {
								self.ss_dismiss();
							}

						} catch (e) {
							self.ss_dismiss();
						}
					}).start();
				});
				self.searchedit.setOnKeyListener(new G.View.OnKeyListener({
					onKey: function(view, keycode, event) {
						if (keycode == G.KeyEvent.KEYCODE_ENTER && event.getAction() == G.KeyEvent.ACTION_DOWN) {
							if (self.searchedit.getText().toString() != "") {
								self.ss_dismiss();
								GUI.PopupWindow.Window.SearchDetail.search = self.searchedit.getText().toString();
								GUI.PopupWindow.goto(self, "SearchDetail", true);
							}
							return true;
						}
						return false;
					},
				}));
				self.searchedit.setLayoutParams(new G.RelativeLayout.LayoutParams(-1, G.dp * 45));
				self.searcheditlin.addView(self.searchedit);
				self.searchclear = GUI.Widget.ImageView(-1, -1, DataCollector.toRes("clear"), function(v) {
					self.ss_dismiss();
					self.searchedit.setText("");
				});
				self.searchclear.setLayoutParams(new G.RelativeLayout.LayoutParams(G.dp * 25, G.dp * 25));
				self.searchclear.getLayoutParams().setMargins(G.dp * 10, G.dp * 10, G.dp * 3, G.dp * 10);
				self.searchclear.getLayoutParams().addRule(G.RelativeLayout.ALIGN_PARENT_RIGHT);
				self.searchclear.setPadding(G.dp * 3, G.dp * 3, G.dp * 3, G.dp * 3);
				if (G.sdk == 3) self.searchclear.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.searcheditlin.addView(self.searchclear);
				self.searchlin.addView(self.searcheditlin);
				self.search = GUI.Widget.ImageView(G.dp * 37, G.dp * 37, DataCollector.toRes("search"), function(v) {
					if (self.searchedit.getText().toString() != "") {
						self.ss_dismiss();
						GUI.PopupWindow.Window.SearchDetail.search = self.searchedit.getText().toString();
						GUI.PopupWindow.goto(self, "SearchDetail", true);
					}
				});
				self.search.getLayoutParams().setMargins(G.dp * 4, G.dp * 4, G.dp * 4, G.dp * 4);
				self.search.setFocusable(false);
				if (G.sdk == 3) self.search.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.searchlin.addView(self.search)
				self.linear.addView(self.searchlin);
				self.rpxl = GUI.Widget.LinearLayout(-1, -2, "H", function() {
					GUI.PopupWindow.goto(self, "UserInfomation", true);
				});
				self.rpxl.getLayoutParams().setMargins(G.dp * 7.5, G.dp * 5, G.dp * 10, G.dp * 5);
				self.rpxl.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
				self.rpxl.setBackground(new G.BitmapDrawable(GUI.Util.roundPx(self.width, G.dp * 150, DataCollector.toDeepThemeColor(), G.dp * 15)));
				if (G.sdk == 3) self.rpxl.setBackgroundDrawable(GUI.Util.RippleDrawable(self.width, G.dp * 150, "roundrect", G.dp * 15));
				self.useravator = GUI.Widget.ImageView(self.width * 0.25, self.width * 0.25, DataCollector.toBmp("useravator"));
				self.useravator.setPadding(self.width * 0.07, self.width * 0.073, self.width * 0.04, self.width * 0.073);
				self.rpxl.addView(self.useravator);
				self.logintiplin = GUI.Widget.LinearLayout(self.width * 0.7, -2, "V");
				self.userinfo = GUI.Widget.TextView(-1, -2, "当前用户：" + "<NO USER>");
				self.userinfo.setPadding(G.dp * 5, G.dp * 3.5, G.dp * 5, G.dp * 3.5);
				self.logintiplin.addView(self.userinfo);
				self.logintip = GUI.Widget.TextView(-1, -2, "LV: " + "<NO LEVEL>");
				self.logintip.setTextSize(GUI.Configuration.sTextSize);
				self.logintip.setPadding(G.dp * 5, G.dp * 3.5, G.dp * 5, G.dp * 3.5);
				self.logintiplin.addView(self.logintip);
				self.rpxl.addView(self.logintiplin);
				self.linear.addView(self.rpxl);
				self.operateList = new G.ListView(ctx);
				self.operateList.setDividerHeight(G.dp * 1);
				self.operateList.setAdapter(self.operateListAdapter = new GUI.Util.RhinoListAdapter(self.sdat = [{
					bitmap: DataCollector.toRes("library_music"),
					title: "本地音乐",
					onclick: function() {
						GUI.PopupWindow.goto(self, "LocalMusic", true);
					},
				}, {
					bitmap: DataCollector.toRes("queue_music"),
					title: "播放历史",
					onclick: function() {

					}
				}, {
					bitmap: DataCollector.toRes("star"),
					title: "我的收藏",
					onclick: function() {

					}
				}, {
					bitmap: DataCollector.toRes("music_note"),
					title: "我的电台",
					onclick: function() {

					}
				}], function(e) {
					e._l = GUI.Widget.LinearLayout(-1, -2, "H")
					e._l.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
					e._l.setPadding(2 * G.dp, 5 * G.dp, 2 * G.dp, 5 * G.dp);
					e._icon = GUI.Widget.ImageView(G.dp * 35, G.dp * 35, e.bitmap);
					e._icon.setPadding(7 * G.dp, 7 * G.dp, 7 * G.dp, 7 * G.dp);
					e._l.addView(e._icon);
					e._title = GUI.Widget.TextView(self.width - G.dp * 39, G.dp * 35, e.title);
					e._title.setPadding(10 * G.dp, 5 * G.dp, 10 * G.dp, 5 * G.dp);
					e._title.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
					e._title.setFocusable(false);
					e._l.addView(e._title);
					return e._l;
				}));
				//
				self.operateListHeight = 0;
				for (var i = 0; i < self.operateListAdapter.getCount(); i++) {
					var listItem = self.operateListAdapter.getView(i, null, self.operateList);
					listItem.measure(0, 0);
					self.operateListHeight += listItem.getMeasuredHeight();
				}
				self.operateListLP = new G.LinearLayout.LayoutParams(-1, -2);
				self.operateListLP.height = self.operateListHeight + (self.operateList.getDividerHeight() * (self.operateListAdapter.getCount() - 1));
				self.operateList.setLayoutParams(self.operateListLP);
				//
				self.operateList.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						try {
							var e = self.sdat[pos];
							e.onclick();
							return true;
						} catch (e) {

						}
					}
				}));
				self.linear.addView(self.operateList);
				self.myplaylist_title = GUI.Widget.TextView(-1, -1, "我创建的歌单", function() {});
				self.myplaylist_title.getLayoutParams().setMargins(0, 0, 0, G.dp * 5);
				self.myplaylist_title.setPadding(G.dp * 15, G.dp * 7.5, 0, G.dp * 7.5);
				self.myplaylist_title.setTextSize(GUI.Configuration.sTextSize);
				self.myplaylist_title.setBackgroundColor(DataCollector.toDeepThemeColor());
				self.linear.addView(self.myplaylist_title);

				self.playlist = new G.ListView(ctx);
				self.playlist.setDividerHeight(G.dp);
				self.playlist.setAdapter(self.playlistAdapter = new GUI.Util.RhinoListAdapter([], function(s) {
					var _l = GUI.Widget.LinearLayout(-1, -2, "H");
					_l.setPadding(G.dp * 10, G.dp * 10, 0, G.dp * 10);
					_l.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
					var _imgpix = GUI.Widget.ImageView(G.dp * 50, G.dp * 50, new G.Bitmap.createBitmap(G.dp * 50, G.dp * 50, G.Bitmap.Config.ARGB_8888));
					_imgpix.getLayoutParams().setMargins(0, 0, G.dp * 15, 0);
					_l.addView(_imgpix);
					var _tl = GUI.Widget.LinearLayout(-1, -2, "V");
					var _title = GUI.Widget.TextView(-1, -2, s.title);
					_title.setTextSize(GUI.Configuration.mTextSize);
					_title.setPadding(0, 0, 0, G.dp * 3);
					_title.setSingleLine(true)
					_title.setEllipsize(G.TextUtils.TruncateAt.END);
					_tl.addView(_title);
					if (s.text) {
						var _text = GUI.Widget.TextView(-1, -2, s.text);
						_text.setTextSize(GUI.Configuration.sTextSize);
						_text.setPadding(0, G.dp * 3, 0, 0);
						_text.setSingleLine(true)
						_text.setEllipsize(G.TextUtils.TruncateAt.END);
						_text.setTextColor(DataCollector.toHintTextColor(true));
						_tl.addView(_text);
					}
					_l.addView(_tl);
					G.th(function() {
						var imgStream = NetworkInterface.getInputStream(s.picurl)[1];
						var bmp = G.Bitmap.createScaledBitmap(G.BitmapFactory.decodeStream(imgStream), G.dp * 50, G.dp * 50, true);
						G.ui(function() {
							_imgpix.setImageBitmap(bmp);
						});
					}).start();
					return _l;
				}));
				self.playlistAdapterController = GUI.Util.RhinoListAdapter.getController(self.playlistAdapter);
				self.playlist.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						self.ss_dismiss();
						var arr = self.playlistAdapterController.get(pos);
						return true;
					}
				}));


				self.linear.addView(self.playlist);
				self.scroll.addView(self.linear);

				if (self.searchedit.getText() == "") {
					self.haveText = false;
					self.searchclear.setAlpha(0);
				} else {
					self.haveText = true;
					self.searchclear.setAlpha(1);
				}

				GUI.PopupWindow.view.addView(self.scroll);

				self.showss = function(mode, data) {
					G.ui(function() {
						if (!self.shouldshow || !DataCollector.S_CONFIG.searchsuggest) return;
						if (mode == 0) {
							self.issss = true;
							self.ss_operate = new G.ListView(ctx);
							self.ss_operate.setDividerHeight(G.dp);
							self.ss_operate.setAlpha(DataCollector.S_CONFIG.winalpha);
							self.ss_operate.setLayoutParams(new G.LinearLayout.LayoutParams(self.searchedit.getMeasuredWidth(), -2));
							self.ss_operate.setAdapter(self.ss_ad = new GUI.Util.RhinoListAdapter(self.ss_list = data, function(e, i, a, params) {
								e.view = GUI.Widget.TextView(self.searchedit.getMeasuredWidth(), -2, e.name);
								e.view.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
								e.view.setPadding(G.dp * 20, G.dp * 10, G.dp * 20, G.dp * 10);
								if (G.sdk == 3) e.view.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 50, G.dp * 50, "rect"));
								return e.view;
							}));
							self.ss_operate.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
								onItemClick: function(parent, view, pos, id) {
									var element = parent.getAdapter().getItem(pos);
									self.searchedit.setText(element.name);
									self.ss_dismiss();
									GUI.PopupWindow.Window.SearchDetail.search = self.searchedit.getText().toString();
									GUI.PopupWindow.goto(self, "SearchDetail", true);
								}
							}));
							self.ss_operate.setBackgroundColor(DataCollector.toDeepThemeColor());
							self.ss_operate.setEnabled(false);

							self.ss_location = new java.lang.reflect.Array.newInstance(java.lang.Integer.TYPE, 2);
							self.searchedit.getLocationOnScreen(self.ss_location);
							self.ss_operate.measure(G.View.MeasureSpec.UNSPECIFIED, G.View.MeasureSpec.UNSPECIFIED);
							self.ss_suspension = new G.PopupWindow(self.ss_operate, self.searchedit.getMeasuredWidth(), -2, true);
							self.ss_suspension.setWindowLayoutType(GUI.Configuration.DISPLAY_TYPE);
							self.ss_suspension.setFocusable(false);
							self.ss_suspension.setOnDismissListener(new G.PopupWindow.OnDismissListener({
								onDismiss: function() {
									self.issss = false;
								},
							}));
							self.ss_suspension.showAtLocation(ctx.getWindow().getDecorView(), G.Gravity.NO_GRAVITY,
								self.ss_location[0],
								self.ss_location[1] + self.searchedit.getHeight());
							if (G.sdk == 3) {
								GUI.Util.circularAnim(self.ss_operate, 300, new G.DecelerateInterpolator(2), function() {
										self.ss_operate.setEnabled(true);
									}, self.ss_location[0] + self.ss_operate.getMeasuredWidth() / 2,
									self.ss_location[1] - self.ss_operate.getMeasuredHeight());
							} else {
								GUI.Util.objAnim(self.ss_operate, 200, new G.DecelerateInterpolator(2), [{
									key: GUI.Configuration.AnimType.ALPHA,
									start: 0,
									end: 1
								}], function() {
									self.ss_operate.setEnabled(true);
								});
							}
						} else {
							self.ss_operate.setEnabled(false);
							GUI.Util.RhinoListAdapter.getController(self.ss_ad).setArray(data);
							GUI.Util.objAnim(self.ss_operate, 150, new G.DecelerateInterpolator(2), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 0,
								end: 1
							}], function() {
								self.ss_operate.setEnabled(true);
							});
						}
					});
				};
				self.ss_dismiss = function() {
					G.ui(function() {
						if (self.issss) {
							GUI.Util.objAnim(self.ss_operate, 200, new G.DecelerateInterpolator(2), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 1,
								end: 0
							}], function() {
								self.ss_suspension.dismiss();
								self.issss = false;
							});
						}
					})
				};


			},
			execute: function(self, current) {
				
				if (DataCollector.user) {
					G.th(function() {
						var udata = DataCollector.Loader.load(DataCollector.Loader.Type.USER_PLAYLIST, DataCollector.user.account.id);
						GUI.Widget.showTextDialog(JSON.stringify(udata, "", 4));
					}).start();
				}
			},
			pretogo: function(self, current) {
				self.shouldshow = false;
				self.ss_dismiss();
				current.search = self.searchedit.getText();
			}
		});

		GUI.PopupWindow.addWindow({
			name: "UserInfomation",
			title: "登录一下？",

			views: function(self, current) {

				GUI.PopupWindow.view.setOrientation(G.LinearLayout.VERTICAL);

				GUI.PopupWindow.view.setGravity(G.Gravity.CENTER | G.Gravity.TOP);
				self.avator = GUI.Widget.ImageView(G.dp * 60, G.dp * 60, DataCollector.toBmp("useravator"));
				self.avator.getLayoutParams().setMargins(0, G.dp * 30, 0, G.dp * 15);
				GUI.PopupWindow.view.addView(self.avator);
				self.editlay = GUI.Widget.LinearLayout(-2, -2, "V");
				self.acedit = GUI.Widget.EditText(GUI.Configuration.width * 0.75, G.dp * 45, DataCollector.USER_DATA.Account.account_number, "请输入账号");
				self.editlay.addView(self.acedit);
				self.pdedit = GUI.Widget.EditText(GUI.Configuration.width * 0.75, G.dp * 45, DataCollector.USER_DATA.Account.password, "请输入密码");
				self.editlay.addView(self.pdedit);
				GUI.PopupWindow.view.addView(self.editlay);
				self.gogogo = GUI.Widget.Button(-2, -2, "开启新世界", function() {
					if (self.acedit.getText() == "" || self.pdedit.getText() == "") {
						GUI.Widget.showTextDialog("你想登录空气？");
					} else {
						DataCollector.USER_DATA.Account.account_number = String(self.acedit.getText());
						DataCollector.USER_DATA.Account.password = String(self.pdedit.getText())
						DataCollector.userLogin(DataCollector.USER_DATA.Account.account_number, DataCollector.USER_DATA.Account.password);
					}
				});
				self.gogogo.getLayoutParams().setMargins(0, G.dp * 15, 0, 0);
				self.gogogo.setPadding(G.dp * 15, G.dp * 15, G.dp * 15, G.dp * 15);
				GUI.PopupWindow.view.addView(self.gogogo);
				//
			},
			
			execute: function(self, current) {
				
				if (DataCollector.user) {

				}
			},

			pretogo: function(self, current) {

			}
		});

		GUI.PopupWindow.addWindow({
			name: "SearchDetail",
			title: "搜索详情",

			search: "",
			type: 1,

			views: function(self, current) {

				self.type = NeteaseCloudMusic.Type.SONG;
				self.pageoffset = 0;
				self.order = 0;
				self.temps = "";
				self.isNoMoreResults = false;

				GUI.PopupWindow.view.setOrientation(G.LinearLayout.VERTICAL);

				self.topview = GUI.Widget.View(-1, G.dp * 4);
				GUI.PopupWindow.view.addView(self.topview);
				self.searchlin = GUI.Widget.LinearLayout(-1, -2, "H");
				self.searchlin.setPadding(G.dp * 7.5, G.dp * 5, G.dp * 7.5, G.dp * 5);
				self.searcheditlin = GUI.Widget.RelativeLayout(self.width - G.dp * 45, G.dp * 45);
				self.searchedit = GUI.Widget.EditText(-1, -1, current.search, "搜索你喜欢的歌曲/歌单/专辑/...", function(v, t) {
					self.sholdshow = true;
					return false;
				}, function(string, start, before, count) {
					if (!self.haveText && self.searchedit.getText() != "") {
						self.haveText = true;
						GUI.Util.objAnim(self.searchclear, 100, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}, ], function() {
							self.searchclear.setAlpha(1);
						});
					} else if (self.haveText && self.searchedit.getText() == "") {
						self.haveText = false;
						GUI.Util.objAnim(self.searchclear, 100, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 1,
							end: 0
						}, ], function() {
							self.searchclear.setAlpha(0);
						});
					}
				});
				self.searchedit.setOnKeyListener(new G.View.OnKeyListener({
					onKey: function(view, keycode, event) {
						if (keycode == G.KeyEvent.KEYCODE_ENTER && event.getAction() == G.KeyEvent.ACTION_DOWN) {
							if (self.searchedit.getText().toString() != "") self.search(self.searchedit.getText().toString(), 0);
							return true;
						}
						return false;
					},
				}));
				self.searchedit.setLayoutParams(new G.RelativeLayout.LayoutParams(-1, G.dp * 45));
				self.searcheditlin.addView(self.searchedit);
				self.searchclear = GUI.Widget.ImageView(-1, -1, DataCollector.toRes("clear"), function(v) {
					self.searchedit.setText("");
				});
				self.searchclear.setLayoutParams(new G.RelativeLayout.LayoutParams(G.dp * 25, G.dp * 25));
				self.searchclear.getLayoutParams().setMargins(G.dp * 10, G.dp * 10, G.dp * 3, G.dp * 10);
				self.searchclear.getLayoutParams().addRule(G.RelativeLayout.ALIGN_PARENT_RIGHT);
				self.searchclear.setPadding(G.dp * 3, G.dp * 3, G.dp * 3, G.dp * 3);
				if (G.sdk == 3) self.searchclear.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.searcheditlin.addView(self.searchclear);
				self.searchlin.addView(self.searcheditlin);
				self.search = GUI.Widget.ImageView(G.dp * 37, G.dp * 37, DataCollector.toRes("search"), function(v) {
					if (self.searchedit.getText().toString() != "") self.search(self.searchedit.getText().toString(), 0);
				});
				self.search.getLayoutParams().setMargins(G.dp * 4, G.dp * 4, G.dp * 4, G.dp * 4);
				self.search.setFocusable(false);
				if (G.sdk == 3) self.search.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.searchlin.addView(self.search)
				GUI.PopupWindow.view.addView(self.searchlin);
				self.chooser = GUI.Widget.LinearLayout(-1, -2, "H");
				self.selection = [];
				(self.choserbar = [{
					name: "歌曲",
					value: 1,
					view: null,
				}, {
					name: "专辑",
					value: 10,
					view: null,
				}, {
					name: "歌手",
					value: 100,
					view: null,
				}, {
					name: "歌单",
					value: 1000,
					view: null,
				}, {
					name: "用户",
					value: 1002,
					view: null,
				}]).map(function(element, index) {
					element.view = self.selection[index] = GUI.Widget.TextView(GUI.Configuration.width / self.choserbar.length, -2, element.name, function(view) {
						self.type = element.value;
						view.setTextColor(G.applicationThemeColor);
						for (var i = 0; i < self.choserbar.length; i++) {
							if ((i + 1000) != view.getId()) self.selection[i].setTextColor(DataCollector.toTextColor(true));
						}
						if (self.searchedit.getText().toString() != "") self.search(self.searchedit.getText().toString(), 0);
					});
					element.view.setId(1000 + index);
					element.view.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
					element.view.setPadding(0, G.dp * 10, 0, G.dp * 10);
					if (G.sdk == 3) element.view.setBackgroundDrawable(GUI.Util.RippleDrawable(GUI.Configuration.width / 6, G.dp * 50, "rect"));
					self.chooser.addView(element.view);
				});
				GUI.PopupWindow.view.addView(self.chooser);
				self.list = new G.ListView(ctx);
				self.list.setDividerHeight(1);
				self.list.setAdapter(self.listAdapter = new GUI.Util.RhinoListAdapter([], function(s) {
					switch (self.type) {
						case NeteaseCloudMusic.Type.SONG:
							var _l = GUI.Widget.LinearLayout(-1, -2, "H");
							_l.setPadding(G.dp * 10, G.dp * 10, 0, G.dp * 10);
							_l.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
							var _order = GUI.Widget.TextView(G.dp * 50, -2, String(++self.order));
							_order.setTextSize(GUI.Configuration.mTextSize);
							_order.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
							_order.setTextColor(DataCollector.toHintTextColor(true));
							_order.setPadding(G.dp * 5, 0, G.dp * 15, 0);
							_l.addView(_order);
							var _tl = GUI.Widget.LinearLayout(-1, -2, "V");
							var fore = {};
							if ((new RegExp(self.temps, "gi")).test(s.title)) {
								fore.title = new G.SpannableString(s.title);
								var start = s.title.toLowerCase().indexOf(self.temps.toLowerCase());
								fore.title.setSpan(new G.ForegroundColorSpan(G.applicationThemeColor), (start < 0) ? 0 : start, start + Adapter.length(self.temps), G.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
							} else {
								fore.title = s.title;
							}
							var _title = GUI.Widget.TextView(-1, -2, fore.title);
							_title.setTextSize(GUI.Configuration.mTextSize);
							_title.setPadding(0, 0, 0, G.dp * 3);
							_title.setSingleLine(true)
							_title.setEllipsize(G.TextUtils.TruncateAt.END);
							_tl.addView(_title);
							if ((new RegExp(self.temps, "gi")).test(s.text)) {
								fore.text = new G.SpannableString(s.text);
								var start = s.text.toLowerCase().indexOf(self.temps.toLowerCase());
								fore.text.setSpan(new G.ForegroundColorSpan(G.applicationThemeColor), (start < 0) ? 0 : start, start + Adapter.length(self.temps), G.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
							} else {
								fore.text = s.text;
							}
							var _text = GUI.Widget.TextView(-1, -2, fore.text);
							_text.setTextSize(GUI.Configuration.sTextSize);
							_text.setPadding(0, G.dp * 3, 0, s.text2 ? G.dp * 3 : 0);
							_text.setSingleLine(true)
							_text.setEllipsize(G.TextUtils.TruncateAt.END);
							_text.setTextColor(DataCollector.toHintTextColor(true));
							_tl.addView(_text);
							if (s.text2) {
								var _text2 = GUI.Widget.TextView(-1, -2, s.text2);
								_text2.setTextSize(GUI.Configuration.sTextSize);
								_text2.setPadding(0, G.dp * 3, 0, 0);
								_text2.setSingleLine(true)
								_text2.setEllipsize(G.TextUtils.TruncateAt.END);
								_text2.setTextColor(DataCollector.toHintTextColor(true));
								_tl.addView(_text2);
							}
							_l.addView(_tl);
							return _l;
							break;
						case NeteaseCloudMusic.Type.ARTIST:
						case NeteaseCloudMusic.Type.ALBUM:
						case NeteaseCloudMusic.Type.PLAYLIST:
							var _l = GUI.Widget.LinearLayout(-1, -2, "H");
							_l.setPadding(G.dp * 10, G.dp * 10, 0, G.dp * 10);
							_l.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
							var _imgpix = GUI.Widget.ImageView(G.dp * 50, G.dp * 50, new G.Bitmap.createBitmap(G.dp * 50, G.dp * 50, G.Bitmap.Config.ARGB_8888));
							_imgpix.getLayoutParams().setMargins(0, 0, G.dp * 15, 0);
							_l.addView(_imgpix);
							var _tl = GUI.Widget.LinearLayout(-1, -2, "V");
							var fore = {};
							if ((new RegExp(self.temps, "gi")).test(s.title)) {
								fore.title = new G.SpannableString(s.title);
								fore.title.setSpan(new G.ForegroundColorSpan(G.applicationThemeColor), s.title.toLowerCase().indexOf(self.temps.toLowerCase()), s.title.toLowerCase().indexOf(self.temps.toLowerCase()) + Adapter.length(self.temps), G.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
							} else {
								fore.title = s.title;
							}
							var _title = GUI.Widget.TextView(-1, -2, fore.title);
							_title.setTextSize(GUI.Configuration.mTextSize);
							_title.setPadding(0, 0, 0, G.dp * 3);
							_title.setSingleLine(true);
							_title.setEllipsize(G.TextUtils.TruncateAt.END);
							_tl.addView(_title);
							if (s.text) {
								if ((new RegExp(self.temps, "gi")).test(s.text)) {
									fore.text = new G.SpannableString(s.text);
									fore.text.setSpan(new G.ForegroundColorSpan(G.applicationThemeColor), s.text.toLowerCase().indexOf(self.temps.toLowerCase()), s.text.toLowerCase().indexOf(self.temps.toLowerCase()) + Adapter.length(self.temps), G.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
								} else {
									fore.text = s.text;
								}
								var _text = GUI.Widget.TextView(-1, -2, fore.text);
								_text.setTextSize(GUI.Configuration.sTextSize);
								_text.setPadding(0, G.dp * 3, 0, 0);
								_text.setSingleLine(true)
								_text.setEllipsize(G.TextUtils.TruncateAt.END);
								_text.setTextColor(DataCollector.toHintTextColor(true));
								_tl.addView(_text);
							}
							_l.addView(_tl);
							G.th(function() {
								var imgStream = NetworkInterface.getInputStream(s.picurl)[1];
								var bmp = G.Bitmap.createScaledBitmap(G.BitmapFactory.decodeStream(imgStream), G.dp * 50, G.dp * 50, true);
								G.ui(function() {
									_imgpix.setImageBitmap(bmp);
									GUI.Util.objAnim(_imgpix, 200, new G.DecelerateInterpolator(), [{
										key: GUI.Configuration.AnimType.ALPHA,
										start: 0,
										end: 1
									}], function() {
										_imgpix.setAlpha(1);
									});
								});
							}).start();
							return _l;
							break;
						case NeteaseCloudMusic.Type.USER:

							return _l;
							break;
					}
				}));
				self.listAdapterController = GUI.Util.RhinoListAdapter.getController(self.listAdapter);
				self.list.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({
					onItemLongClick: function(parent, view, pos, id) {
						G.th(function() {
							try {
								self.ss_dismiss();
								switch (self.type) {
									case NeteaseCloudMusic.Type.SONG:
										GUI.Widget.showTextDialog(JSON.stringify(DataCollector.Loader.load(DataCollector.Loader.Type.SONG, self.listAdapterController.get(pos).id), "", 4));
										break;
									case NeteaseCloudMusic.Type.ARTIST:
										GUI.Widget.showTextDialog(JSON.stringify(DataCollector.Loader.load(DataCollector.Loader.Type.ARTIST, self.listAdapterController.get(pos).id), "", 4));
										break;
									case NeteaseCloudMusic.Type.ALBUM:
										GUI.Widget.showTextDialog(JSON.stringify(DataCollector.Loader.load(DataCollector.Loader.Type.ALBUM, self.listAdapterController.get(pos).id), "", 4));
										break;
									case NeteaseCloudMusic.Type.PLAYLIST:
										GUI.Widget.showTextDialog(JSON.stringify(DataCollector.Loader.load(DataCollector.Loader.Type.PLAYLIST, self.listAdapterController.get(pos).id), "", 4));
										break;
								}
								print(self.tempid);
								return true;
							} catch (e) {
								ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "PopupWindow.Window." + current.name, (function(sarg) {
									var arr = [];
									arr.push(ConsoleEmulator.traceErrorStack(e));
									for (var i in sarg) {
										arr.push(sarg[i])
									};
									return arr;
								}(arguments)));
								err(e)
							}
						}).start();
						return true;
					}
				}));
				self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						self.ss_dismiss();
						if (self.type != NeteaseCloudMusic.Type.SONG) return true;
						var arr = self.listAdapterController.get(pos);
						G.th(function() {
							try {
								GUI.PopupWindow.Window.PlaySong.id = arr.id;
								APlayer.play(arr.id);
								GUI.PopupWindow.goto(self, "PlaySong", true);
							} catch (e) {
								ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "PopupWindow.Window." + current.name, (function(sarg) {
									var arr = [];
									arr.push(ConsoleEmulator.traceErrorStack(e));
									for (var i in sarg) {
										arr.push(sarg[i])
									};
									return arr;
								}(arguments)));
								err(e)
							}
						}).start();
						return true;
					}
				}));
				self.list.setOnScrollListener(new G.AbsListView.OnScrollListener({
					onScroll: function(view, firstVisibleItem, visibleItemCount, totalItemCount) {
						if ((firstVisibleItem + visibleItemCount) == totalItemCount) {
							var lastVisibleItemView = self.list.getChildAt(self.list.getChildCount() - 1);
							if (lastVisibleItemView != null && lastVisibleItemView.getBottom() == self.list.getHeight() && self.isNoMoreResults == false) {
								self.search(null, 1);
							}
						}
					},
				}));
				self.search = function(keyword, mode) {
					keyword = String(keyword);
					if (mode == 0) {
						self.listAdapterController.setArray([]);
						self.pageoffset = 0;
						self.order = 0;
						self.temps = keyword;
						self.isNoMoreResults = false;
						GUI.PopupWindow.gtitle.setText(keyword);
					}
					G.th(function() {
						GUI.Util.objAnim(self.list, 150, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 1,
							end: 0
						}, ], function() {
							self.list.setAlpha(0);
						});
						if (mode == 0) {
							var pd = GUI.Widget.showProgressDialog(null, true, false, false);
							pd.setText("搜索中......");
						}
						try {
							var data = JSON.parse(String(NeteaseCloudMusic.API.search((mode == 0) ? keyword : self.temps, 20, ++self.pageoffset, self.type)));
						} catch (e) {
							ConsoleEmulator.log(ConsoleEmulator.LogType.ERROR, GUI.module, "PopupWindow.Window." + current.name, (function(sarg) {
								var arr = [];
								arr.push(ConsoleEmulator.traceErrorStack(e));
								for (var i in sarg) {
									arr.push(sarg[i])
								};
								return arr;
							}(arguments)));
							GUI.Widget.showTextDialog("网络异常，无法连接服务器！\n\n您可以试试以下方法：\n1.检查您的网络连接是否正常\n2.联系开发者\n\n详细信息：\n" + e + "\n" + e.stack);
							var data = {
								result: []
							};
						}
						ConsoleEmulator.log(ConsoleEmulator.LogType.OUTPUT, "API", "search", {
							keyword: ((mode == 0) ? keyword : self.temps),
							page: self.pageoffset
						});
						switch (self.type) {
							case NeteaseCloudMusic.Type.SONG:
								try {
									if (data.result.songs.length < 20) self.isNoMoreResults = true;
								} catch (e) {
									self.isNoMoreResults = true;
								};
								for (var i in data.result.songs) {
									var artists = "";
									for (var ia in data.result.songs[i].ar) {
										artists += (data.result.songs[i].ar[ia].name + ((ia == data.result.songs[i].ar.length - 1) ? "" : "/"));
									}
									self.listAdapterController.add({
										id: data.result.songs[i].id,
										title: data.result.songs[i].name,
										text: artists + " - " + data.result.songs[i].al.name,
										text2: (data.result.songs[i].alia.length != 0 ? ("(" + data.result.songs[i].alia[0] + ")") : null)
									}, false);
									G.ui(function() {
										self.listAdapterController.notifyChange();
									});
								}
								break;
							case NeteaseCloudMusic.Type.ARTIST:
								try {
									if (data.result.artists.length < 10) self.isNoMoreResults = true;
								} catch (e) {
									self.isNoMoreResults = true;
								};
								for (var i in data.result.artists) {
									self.listAdapterController.add({
										id: data.result.artists[i].id,
										title: data.result.artists[i].name,
										picurl: data.result.artists[i].img1v1Url,
									}, false);
									G.ui(function() {
										self.listAdapterController.notifyChange();
									});
								}
								break;
							case NeteaseCloudMusic.Type.ALBUM:
								try {
									if (data.result.albums.length < 10) self.isNoMoreResults = true;
								} catch (e) {
									self.isNoMoreResults = true;
								};
								for (var i in data.result.albums) {
									var artists = "";
									for (var ia in data.result.albums[i].artists) {
										artists += (data.result.albums[i].artists[ia].name + ((ia == data.result.albums[i].artists.length - 1) ? "" : "/"));
									}
									self.listAdapterController.add({
										id: data.result.albums[i].id,
										title: data.result.albums[i].name,
										text: artists + " Realease Date: " + (new java.text.SimpleDateFormat("yyyy.MM.dd")).format(data.result.albums[i].publishTime),
										picurl: data.result.albums[i].blurPicUrl,
									}, false);
									G.ui(function() {
										self.listAdapterController.notifyChange();
									});
								}
								break;
							case NeteaseCloudMusic.Type.PLAYLIST:
								try {
									if (data.result.playlists.length < 10) self.isNoMoreResults = true;
								} catch (e) {
									self.isNoMoreResults = true;
								};
								for (var i in data.result.playlists) {
									var artists = "";
									self.listAdapterController.add({
										id: data.result.playlists[i].id,
										title: data.result.playlists[i].name,
										text: data.result.playlists[i].trackCount + " tracks, By: " + data.result.playlists[i].creator.nickname + ", " + data.result.playlists[i].playCount + " times play.",
										picurl: data.result.playlists[i].coverImgUrl,
									}, false);
									G.ui(function() {
										self.listAdapterController.notifyChange();
									});
								}
								break;
						}
						if (mode == 0) {
							pd.close();
							if (pd.cancelled) return;
							pd = null;
						}
						GUI.Util.objAnim(self.list, 150, new G.LinearInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}, ], function() {
							self.list.setAlpha(1);
						});
					}).start();
				}
				GUI.PopupWindow.view.addView(self.list);



				self.type = current.type;

			},
			
			execute: function(self, current) {
				
				if (self.searchedit.getText().toString() != "") {
					self.search(self.searchedit.getText().toString(), 0);
					self.haveText = true;
				} else {
					self.haveText = false;
				}
			},
			
			
			pretogo: function(self, current) {
				current.search = self.searchedit.getText().toString();
				GUI.PopupWindow.Window.GetStart.search = self.searchedit.getText().toString();
				current.type = self.type;
			}
		});

		GUI.PopupWindow.addWindow({
			name: "PlaySong",
			title: "",

			id: null,

			duration: 0,
			bartouched: false,
			visualizerinitialized: false,

			views: function(self, current) {
				self.touch = false;
				if (G.sdk == 3) GUI.PopupWindow.gtb.setElevation(0);
				GUI.PopupWindow.gtb.setBackgroundColor(G.Color.TRANSPARENT);
				GUI.PopupWindow.view.setBackgroundColor(G.Color.TRANSPARENT);
				GUI.PopupWindow.gll.setBackgroundColor(G.Color.TRANSPARENT);
				//main relative layout
				self.mlay = new GUI.Widget.RelativeLayout(-1, -1);

				self.alpix = new GUI.Widget.ImageView(-1, -1);
				self.alpix.setLayoutParams(new G.RelativeLayout.LayoutParams(-1, -1));
				self.alpix.getLayoutParams().addRule(G.RelativeLayout.CENTER_IN_PARENT);
				self.alpix.setScaleType(G.ImageView.ScaleType.FIT_XY);
				GUI.PopupWindow.grl.removeView(GUI.PopupWindow.gll);
				GUI.PopupWindow.grl.removeView(GUI.PopupWindow.gbg);
				GUI.PopupWindow.grl.addView(self.alpix);
				GUI.PopupWindow.grl.addView(GUI.PopupWindow.gll);
				GUI.PopupWindow.grl.addView(GUI.PopupWindow.gbg);

				self.operatingbar = new GUI.Widget.LinearLayout(-1, -2, "V");
				self.operatingbar.setLayoutParams(new G.RelativeLayout.LayoutParams(-1, -2));
				self.operatingbar.getLayoutParams().addRule(G.RelativeLayout.ALIGN_PARENT_BOTTOM);
				self.operatingbar.setGravity(G.Gravity.CENTER);

				self.progress = new GUI.Widget.LinearLayout(-1, -2, "H");
				self.progress.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
				self.progress.setPadding(G.dp * 5, G.dp * 5, G.dp * 5, G.dp * 2.5);

				self.time1 = current.nowtime = new GUI.Widget.TextView(-2, -2, "00:00");
				self.time1.setTextSize(GUI.Configuration.sTextSize);
				self.time1.setPadding(G.dp * 2, 0, G.dp * 2, 0);
				self.progress.addView(self.time1);

				self.bar = current.bar = new GUI.Widget.SeekBar(GUI.Configuration.width * 0.8, -2, function() {}, function() {});
				self.bar.setPadding(G.dp * 2, 0, G.dp * 2, 0);
				self.bar.setOnSeekBarChangeListener(new G.SeekBar.OnSeekBarChangeListener({
					onProgressChanged: function(sb, pg, fUser) {},
					onStartTrackingTouch: function(sb) {
						current.bartouched = true;
					},
					onStopTrackingTouch: function(sb) {
						current.bartouched = false;
						if (sb.getProgress() <= sb.getSecondaryProgress()) {
							APlayer.seek(sb.getProgress());
						}
					},
				}));
				self.progress.addView(self.bar);

				self.time2 = new GUI.Widget.TextView(-2, -2, "23:33");
				self.time2.setTextSize(GUI.Configuration.sTextSize);
				self.time2.setPadding(G.dp * 2, 0, G.dp * 2, 0);
				self.progress.addView(self.time2);

				/*self.visview = current.visview = new GUI.Util.VisualizerView.newObject(ctx, G.Bitmap.createBitmap(1, 1, G.Bitmap.Config.ARGB_8888));
				self.visview.setEnabled(false);
				self.visview.setClickable(false);
				self.visview.setLayoutParams(new G.RelativeLayout.LayoutParams(GUI.Configuration.width * 0.75, GUI.Configuration.width * 0.75));
				self.visview.getLayoutParams().addRule(G.RelativeLayout.CENTER_IN_PARENT);
				self.visview.setSkip(5);
				self.visview.setPaintStroke(7);
				self.visview.setAlpha(0);
				self.mlay.addView(self.visview);
				current.visualizerinitialized = true;*/

				self.operatingbar.addView(self.progress);

				self.functions = new GUI.Widget.LinearLayout(-1, -2, "H");
				self.functions.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
				self.functions.setPadding(G.dp * 5, G.dp * 2.5, G.dp * 5, G.dp * 5);

				self.love = GUI.Widget.ImageView(G.dp * 45, G.dp * 45, DataCollector.toRes("star_border"), function(v) {

				});
				self.love.getLayoutParams().setMargins(G.dp * 5, 0, G.dp * 5, 0);
				self.love.setFocusable(false);
				if (G.sdk == 3) self.love.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.functions.addView(self.love);

				self.previous = GUI.Widget.ImageView(G.dp * 45, G.dp * 45, DataCollector.toRes("skip_previous"), function(v) {

				});
				self.previous.getLayoutParams().setMargins(G.dp * 5, 0, G.dp * 5, 0);
				self.previous.setFocusable(false);
				if (G.sdk == 3) self.previous.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.functions.addView(self.previous);

				self.pauseplay = GUI.Widget.ImageView(G.dp * 45, G.dp * 45, DataCollector.toRes("pause"), function(v) {
					if (APlayer.isPlaying) {
						if (APlayer.getPlayState() == (G.AudioTrack.PLAYSTATE_PAUSED || G.AudioTrack.STOPPED)) {
							APlayer.play(current.id);
						} else {
							APlayer.pause();
						}
					} else {
						G.th(function() {
							APlayer.play(current.id);
						}).start()
					}
				});
				self.pauseplay.getLayoutParams().setMargins(G.dp * 5, 0, G.dp * 5, 0);
				self.pauseplay.setFocusable(false);
				if (G.sdk == 3) self.pauseplay.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.functions.addView(self.pauseplay);

				self.next = GUI.Widget.ImageView(G.dp * 45, G.dp * 45, DataCollector.toRes("skip_next"), function(v) {

				});
				self.next.getLayoutParams().setMargins(G.dp * 5, 0, G.dp * 5, 0);
				self.next.setFocusable(false);
				if (G.sdk == 3) self.next.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.functions.addView(self.next);

				self.func = GUI.Widget.ImageView(G.dp * 45, G.dp * 45, DataCollector.toRes("list"), function(v) {
					/*G.th(function() {
						var url = DataCollector.Loader.load(DataCollector.Loader.Type.SONG_MP3U, current.id, 320000).data[0].url;
						var isd = NetworkInterface.getInputStream(url, NeteaseCloudMusic.API.get_rpp_songmp3(url.split("/")[2]));
						GUI.Widget.showTopToast("Downloading", url);
						DataCollector.IO.saveByInputStream(DataCollector.songFolder + current.id + ".mp3", isd[1], false, true);
						GUI.Widget.showTopToast("Download Complete");
					}).start();*/
					GUI.PopupWindow.Window.SongComment.id = current.id;
					GUI.PopupWindow.goto(self, "SongComment", true);
				});
				self.func.getLayoutParams().setMargins(G.dp * 5, 0, G.dp * 5, 0);
				self.func.setFocusable(false);
				if (G.sdk == 3) self.func.setBackgroundDrawable(GUI.Util.RippleDrawable(G.dp * 5, G.dp * 5));
				self.functions.addView(self.func);

				self.operatingbar.addView(self.functions);

				self.mlay.addView(self.operatingbar);
				GUI.PopupWindow.view.addView(self.mlay);
				//realize functions

				

			},
			
			execute: function(self, current) {
				G.th(function() {
					self.sec = Math.round(current.duration / 1000) % 60;
					self.min = (Math.round(current.duration / 1000) - self.sec) / 60;
					G.ui(function() {
						self.time2.setText(self.min + ":" + self.sec);
						self.bar.setMax(current.duration);
						if (APlayer.isBufferCompleted || APlayer.mode == 2) self.bar.setSecondaryProgress(APlayer.duration);
						self.alpix.setAlpha(0);
					});
					self.sdata = DataCollector.Loader.load(DataCollector.Loader.Type.SONG, current.id);
					G.ui(function() {
						GUI.PopupWindow.gtitle.setText(self.sdata.songs[0].name);
					});
					self.pic = DataCollector.Loader.load(DataCollector.Loader.Type.SONG_PICTURE, current.id);
					self.blurpic = G.Bitmap.createScaledBitmap(self.pic, 100, 100, true);

					self.sb = new StackBlurManager();
					self.sb.setBitmap(self.blurpic);
					self.blurpic = GUI.Util.StackBlur.process(self.sb, 35);

					G.ui(function() {
						self.alpix.setImageBitmap(self.blurpic);
						//self.visview.setBitmap(self.pic);

						GUI.Util.objAnim(self.alpix, 200, new G.DecelerateInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}], function() {
							self.alpix.setAlpha(1);
						});
						/*GUI.Util.objAnim(self.visview, 200, new G.DecelerateInterpolator(), [{
							key: GUI.Configuration.AnimType.ALPHA,
							start: 0,
							end: 1
						}], function() {
							self.visview.setAlpha(1);
						});*/
					});

				}).start();
			},
			
			
			pretogo: function(self, current) {
				current.visualizerinitialized = false;
				GUI.Util.objAnim(self.visview, 100, new G.DecelerateInterpolator(), [{
					key: GUI.Configuration.AnimType.ALPHA,
					start: 1,
					end: 0
				}], function() {
					GUI.PopupWindow.grl.removeView(self.alpix);
				});
			}
		});

		GUI.PopupWindow.addWindow({
			name: "SongComment",
			title: "评论：",
			id: 0,
			views: function(self, current) {

				self.pageoffset = 0;
				self.isnomorecomments = false;

				self.list = new G.ListView(ctx);
				self.list.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -1));
				self.list.setDividerHeight(0);
				self.list.setAdapter(self.listAdapter = new GUI.Util.RhinoListAdapter([], function(s) {
					switch (s.type) {
						case "refreash":
							return GUI.Widget.LinearLayout(-1, 1, "H");
						case "songdetail":
							var _songinfo = GUI.Widget.LinearLayout(-1, -2, "H");
							_songinfo.setPadding(G.dp * 15, G.dp * 15, G.dp * 15, G.dp * 15);
							_songinfo.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
							if (G.sdk == 3) _songinfo.setBackgroundDrawable(GUI.Util.RippleDrawable(self.width, G.dp * 5, "rect"));
							var _songPic = GUI.Widget.ImageView(G.dp * 60, G.dp * 60, new G.Bitmap.createBitmap(G.dp * 60, G.dp * 60, G.Bitmap.Config.ARGB_8888));
							_songPic.getLayoutParams().setMargins(0, 0, G.dp * 20, 0);
							_songinfo.addView(_songPic);
							var _songtextlay = GUI.Widget.LinearLayout(-1, -2, "V");
							var _songtitle = GUI.Widget.TextView(-1, -2, s.songname);
							_songtitle.setTextSize(GUI.Configuration.mTextSize);
							_songtitle.setPadding(0, 0, 0, G.dp * 6);
							_songtitle.setSingleLine(true)
							_songtitle.setEllipsize(G.TextUtils.TruncateAt.END);
							_songtextlay.addView(_songtitle);
							var _songtext = GUI.Widget.TextView(-1, -2, s.songtext);
							_songtext.setTextSize(GUI.Configuration.sTextSize);
							_songtext.setPadding(0, G.dp * 5, 0, 0);
							_songtext.setSingleLine(true)
							_songtext.setEllipsize(G.TextUtils.TruncateAt.END);
							_songtext.setTextColor(DataCollector.toHintTextColor(true));
							_songtextlay.addView(_songtext);
							_songinfo.addView(_songtextlay);
							G.th(function() {
								var _pic = DataCollector.Loader.load(DataCollector.Loader.Type.SONG_PICTURE, current.id);
								G.ui(function() {
									_songPic.setImageBitmap(_pic);
									self.listAdapterController.notifyChange();
									GUI.Util.objAnim(_songPic, 200, new G.DecelerateInterpolator(), [{
										key: GUI.Configuration.AnimType.ALPHA,
										start: 0,
										end: 1
									}], function() {
										_songPic.setAlpha(1);
										self.listAdapterController.notifyChange();
									});
								});
							}).start();
							return _songinfo;
						case "bar":
							var _t = GUI.Widget.TextView(-1, -2, s.text, function() {});
							_t.getLayoutParams().setMargins(0, 0, 0, G.dp * 5);
							_t.setPadding(G.dp * 15, G.dp * 7.5, 0, G.dp * 7.5);
							_t.setTextSize(GUI.Configuration.sTextSize);
							_t.setBackgroundColor(DataCollector.toDeepThemeColor());
							return _t;
						case "comment":
							var _l = GUI.Widget.LinearLayout(-1, -2, "H");
							_l.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
							_l.setGravity(G.Gravity.TOP | G.Gravity.LEFT);
							var _av = GUI.Widget.ImageView(G.dp * 27, G.dp * 27, new G.Bitmap.createBitmap(G.dp * 35, G.dp * 35, G.Bitmap.Config.ARGB_8888));
							_av.getLayoutParams().setMargins(G.dp * 9, G.dp * 9, G.dp * 9, G.dp * 9);
							_l.addView(_av);
							var _content = GUI.Widget.LinearLayout(-1, -2, "V");
							_content.setPadding(G.dp * 3, G.dp * 5, G.dp * 5, G.dp * 5);
							var _info = GUI.Widget.LinearLayout(-1, -2, "H");
							var _rl = GUI.Widget.RelativeLayout(-1, -1);
							var _userinfo = GUI.Widget.LinearLayout(-2, -2, "V");
							_userinfo.setLayoutParams(new G.RelativeLayout.LayoutParams(-2, -2));
							_userinfo.getLayoutParams().addRule(G.RelativeLayout.ALIGN_PARENT_LEFT);
							var _username = GUI.Widget.TextView(-2, -2, s.username);
							_username.setTextColor(DataCollector.toHintTextColor(true));
							_username.setTextSize(GUI.Configuration.mTextSize * 0.75);
							_username.getLayoutParams().setMargins(0, G.dp * 3, 0, G.dp * 1.5);
							_userinfo.addView(_username);
							var _releasedate = GUI.Widget.TextView(-2, -2, "" + s.releasedate);
							_releasedate.setTextSize(GUI.Configuration.sTextSize * 0.75);
							_releasedate.getLayoutParams().setMargins(0, G.dp * 1.5, 0, G.dp * 3);
							_releasedate.setTextColor(DataCollector.toHintTextColor(true));
							_userinfo.addView(_releasedate);
							_rl.addView(_userinfo);
							var _likeCount = GUI.Widget.TextView(-2, -2, s.likecount + "👍");
							_likeCount.setLayoutParams(new G.RelativeLayout.LayoutParams(-2, -2));
							_likeCount.getLayoutParams().addRule(G.RelativeLayout.ALIGN_PARENT_RIGHT);
							_likeCount.getLayoutParams().addRule(G.RelativeLayout.CENTER_IN_PARENT);
							_likeCount.setGravity(G.Gravity.RIGHT | G.Gravity.CENTER);
							_likeCount.setTextSize(GUI.Configuration.sTextSize);
							_rl.addView(_likeCount);
							_info.addView(_rl);
							_content.addView(_info);
							var _comment = GUI.Widget.TextView(-1, -2, s.content);
							_comment.setTextSize(GUI.Configuration.mTextSize * 0.85);
							_comment.getLayoutParams().setMargins(0, G.dp * 5, G.dp * 10, G.dp * 2);
							_content.addView(_comment);
							if (s.reply) {
								var replytext = new G.SpannableString("@" + s.reply.username + ":" + s.reply.content);
								replytext.setSpan(new G.ForegroundColorSpan(G.applicationThemeColor), 1, 1 + Adapter.length(s.reply.username), G.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
								var _reply = GUI.Widget.TextView(-1, -2, replytext);
								_reply.setBackgroundColor(DataCollector.toDeepThemeColor());
								_reply.setTextSize(GUI.Configuration.mTextSize * 0.8);
								_reply.getLayoutParams().setMargins(0, G.dp * 3, G.dp * 10, G.dp * 2);
								_reply.setPadding(G.dp * 2, G.dp * 2, G.dp * 2, G.dp * 2);
								_reply.setTextColor(DataCollector.toHintTextColor(true));
								_content.addView(_reply);
							}
							_l.addView(_content);
							G.th(function() {
								var imgStream = NetworkInterface.getInputStream(s.picurl)[1];
								var bmp = G.Bitmap.createScaledBitmap(G.BitmapFactory.decodeStream(imgStream), G.dp * 50, G.dp * 50, true);
								G.ui(function() {
									self.listAdapterController.notifyChange();
									_av.setImageBitmap(GUI.Util.getCircularBitmap(bmp));
									self.listAdapterController.notifyChange();
									GUI.Util.objAnim(_av, 200, new G.DecelerateInterpolator(), [{
										key: GUI.Configuration.AnimType.ALPHA,
										start: 0,
										end: 1
									}], function() {
										_av.setAlpha(1);
									});
								});
							}).start();
							return _l;
					}
				}));
				self.listAdapterController = GUI.Util.RhinoListAdapter.getController(self.listAdapter);
				self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						var arr = self.listAdapterController.get(pos);
						switch (arr.type) {
							case "songdetail":
								GUI.PopupWindow.back(self, current);
								break;
						}
						return true;
					}
				}));
				self.list.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({
					onItemLongClick: function(parent, view, pos, id) {
						var arr = self.listAdapterController.get(pos);
						switch (arr.type) {
							case "comment":
								GUI.Widget.showTopToast("评论已复制：" + arr.content);
								DataCollector.setClipboardText(arr.content);
								break;
						}
						return true;
					}
				}));
				self.list.setOnScrollListener(new G.AbsListView.OnScrollListener({
					onScroll: function(view, firstVisibleItem, visibleItemCount, totalItemCount) {
						if ((firstVisibleItem + visibleItemCount) == totalItemCount) {
							var lastVisibleItemView = self.list.getChildAt(self.list.getChildCount() - 1);
							if (lastVisibleItemView != null && lastVisibleItemView.getBottom() == self.list.getHeight() && self.isnomorecomments == false) {
								self.loadcomment(false);
							}
						}
					},
				}));

				GUI.PopupWindow.view.addView(self.list);

				

				self.loadcomment = function(f) {
					G.th(function() {
						if (f) {
							var pd = GUI.Widget.showProgressDialog(null, true, false, false);
							pd.setText("加载评论中......");
						}
						self.scomments = DataCollector.Loader.load(DataCollector.Loader.Type.SONG_COMMENTS, current.id, 20, ++self.pageoffset);

						//UI Thread
						G.ui(function() {

							if (f) {
								for (var i in self.scomments.hotComments) {

									if (i == 0) self.listAdapterController.add({
										type: "bar",
										text: "热门评论",
									}, true);

									var date = (new Date()).getTime() - self.scomments.hotComments[i].time,
										time;
									time = (new java.text.SimpleDateFormat("yyyy年MM月dd日 hh:mm:ss")).format(self.scomments.hotComments[i].time)

									var comment_data = {
										type: "comment",
										username: self.scomments.hotComments[i].user.nickname, //用户昵称
										//评论发表时间
										releasedate: time,
										likecount: self.scomments.hotComments[i].likedCount, //点赞数
										content: self.scomments.hotComments[i].content, //评论内容
										picurl: self.scomments.hotComments[i].user.avatarUrl, //用户头像URL
										reply: null, //被评论的评论的信息
									};
									if (self.scomments.hotComments[i].beReplied.length) {
										comment_data.reply = {
											username: self.scomments.hotComments[i].beReplied[0].user.nickname,
											content: self.scomments.hotComments[i].beReplied[0].content,
										}
									}
									self.listAdapterController.add(comment_data, true);
								}
								self.listAdapterController.add({
									type: "bar",
									text: "最新评论(" + self.scomments.total + "条)",
								}, true);
							}

							if (self.scomments.comments.length < 20) self.isnomorecomments = true;

							for (var i in self.scomments.comments) {

								var date = (new Date()).getTime() - self.scomments.comments[i].time,
									time;
								time = (new java.text.SimpleDateFormat("yyyy年MM月dd日 hh:mm:ss")).format(self.scomments.comments[i].time);

								var comment_data = {
									type: "comment",
									username: self.scomments.comments[i].user.nickname, //用户昵称
									//评论发表时间
									releasedate: time,
									likecount: self.scomments.comments[i].likedCount, //点赞数
									content: self.scomments.comments[i].content, //评论内容
									picurl: self.scomments.comments[i].user.avatarUrl, //用户头像URL
									reply: null, //被评论的评论的信息
								};
								if (self.scomments.comments[i].beReplied.length) {
									comment_data.reply = {
										username: self.scomments.comments[i].beReplied[0].user.nickname,
										content: self.scomments.comments[i].beReplied[0].content,
									}
								}
								self.listAdapterController.add(comment_data, true);
							}
							GUI.Util.objAnim(self.list, 200, new G.DecelerateInterpolator(), [{
								key: GUI.Configuration.AnimType.ALPHA,
								start: 0,
								end: 1
							}], function() {
								self.list.setAlpha(1);
							});

						});
						if (f) {
							pd.close();
							if (pd.cancelled) return;
							pd = null;
						}
					}).start();
				}

				
			},
			execute: function(self, current) {
				self.listAdapterController.add({
					type: "songdetail",
					songname: "null",
					songtext: "null",
				}, true);

				G.th(function() {
					self.songdetail = DataCollector.Loader.load(DataCollector.Loader.Type.SONG, current.id).songs[0];
					var artists = "";
					for (var ia in self.songdetail.artists) {
						artists += (self.songdetail.artists[ia].name + ((ia == self.songdetail.artists.length - 1) ? "" : "/"));
					}
					G.ui(function() {
						GUI.PopupWindow.gtitle.setText("评论：" + self.songdetail.name);
						self.listAdapterController.replace({
							type: "songdetail",
							songname: self.songdetail.name,
							songtext: artists,
						}, 0);
					});

				}).start();
				self.loadcomment(true);
			},
			pretogo: function(self, current) {}
		});


		GUI.PopupWindow.addWindow({
			name: "LocalMusic",
			title: "本地音乐",
			views: function(self, current) {

				GUI.PopupWindow.view.setOrientation(G.LinearLayout.VERTICAL);

				self.tip = new GUI.Widget.TextView(-1, -2, "扫描中...");
				self.tip.setPadding(G.dp * 5, G.dp * 5, G.dp * 5, G.dp * 5);
				self.tip.setTextSize(GUI.Configuration.sTextSize);
				self.tip.setTextColor(DataCollector.toHintTextColor(true));
				GUI.PopupWindow.view.addView(self.tip);
				self.listView = new G.ListView(ctx);
				self.listView.setDividerHeight(1);
				self.listAdapter = GUI.Util.SimpleListAdapter.getController(new GUI.Util.SimpleListAdapter([], function(holder, params) {
					var linear = GUI.Widget.LinearLayout(-1, -2, "V");
					linear.setPadding(G.dp * 10, G.dp * 5, G.dp * 10, G.dp * 5);
					var title = holder.title = GUI.Widget.TextView(-1, -2);
					title.setTextSize(G.dp * 5);
					title.setPadding(0, 0, 0, G.dp * 1.5);
					linear.addView(title);
					var detail = holder.detail = GUI.Widget.TextView(-1, -2, "null");
					detail.setTextSize(G.dp * 3);
					detail.setTextColor(DataCollector.toHintTextColor(true));
					detail.setPadding(0, G.dp * 1.5, 0, G.dp * 1.5);
					detail.setEllipsize(G.TextUtils.TruncateAt.END);
					linear.addView(detail);
					var path = holder.path = GUI.Widget.TextView(-1, -2);
					path.setTextSize(G.dp * 3);
					path.setTextColor(DataCollector.toHintTextColor(true));
					path.setPadding(0, G.dp * 1.5, 0, 0);
					detail.setEllipsize(G.TextUtils.TruncateAt.END);
					linear.addView(path);
					return linear;
				}, function(holder, element, index, array, params) {
					var sec = Math.round(element.duration / 1000) % 60;
					var min = (Math.round(element.duration / 1000) - sec) / 60;
					holder.title.setText(element.filename);
					holder.detail.setText("Size: " + (element.filesize / 1024 / 1024).toFixed(2) + "MB, Duration: " + min + ":" + sec);
					holder.path.setText(element.path);
				}));
				self.listView.setAdapter(self.listAdapter.self);
				self.listView.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						var item = self.listAdapter.get(pos);
					},
				}));
				self.listView.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
				GUI.PopupWindow.view.addView(self.listView);

			},
			execute: function(self, current) {
				
				G.th(function() {
					var pd = GUI.Widget.showProgressDialog(null, true);
					pd.setText("本地歌曲搜索中...");
					self.cursor = ctx.getContentResolver().query(android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, [
						android.provider.MediaStore.Audio.Media.DATA, //文件路径
						android.provider.MediaStore.Audio.Media.DISPLAY_NAME, //文件名
						android.provider.MediaStore.Audio.Media.TITLE, //歌曲名
						android.provider.MediaStore.Audio.Media.DURATION, //妈耶
						android.provider.MediaStore.Audio.Media.SIZE //大小
					], null, null, null);
					if (self.cursor.moveToFirst()) {
						do {
							self.listAdapter.add({
								path: self.cursor.getString(0),
								filename: self.cursor.getString(1),
								title: self.cursor.getString(2),
								duration: self.cursor.getString(3),
								filesize: self.cursor.getString(4),
							});
						} while (self.cursor.moveToNext());
						self.cursor.close();
						self.listAdapter.notifyChange();
					}
					G.ui(function() {
						self.tip.setText("扫描完成，共有 " + self.listAdapter.getAll().length + " 首歌");
					});
					pd.close();
				}).start();
			},
			pretogo: function(self, current) {}
		});

		GUI.PopupWindow.addWindow({
			name: "Console",
			title: "控制台",

			views: function(self, current) {

				GUI.PopupWindow.view.setOrientation(G.LinearLayout.VERTICAL);
				GUI.PopupWindow.gsettings.setImageBitmap(new G.Bitmap.createBitmap(1, 1, G.Bitmap.Config.ARGB_8888));
				GUI.PopupWindow.gsettings.setBackgroundDrawable(new G.ColorDrawable(G.Color.argb(0, 0, 0, 0)));
				GUI.PopupWindow.gtb.setBackgroundDrawable(new G.ColorDrawable(G.Color.parseColor("#607D8B")));
				GUI.PopupWindow.gtitle.setTextColor(DataCollector.textColor.white);
				GUI.PopupWindow.gback.setImageBitmap(DataCollector.resources.ic_arrow_back_white_48dp);
				GUI.PopupWindow.gdismiss.setImageBitmap(DataCollector.resources.ic_close_white_48dp);

				self.gscroll = GUI.Widget.ScrollLayout(-1, -1);

				self.list = new G.ListView(ctx);
				self.list.setLayoutParams(new G.LinearLayout.LayoutParams(-1, 0, 1.0));
				self.list.setDividerHeight(0);
				self.list.setBackgroundColor(G.Color.BLACK);
				self.list.setAdapter(self.listAdapter = new GUI.Util.RhinoListAdapter(ConsoleEmulator.logStack, function(s) {
					var l;
					switch (s.type) {
						case ConsoleEmulator.LogType.CONSOLE_MSG:
							l = GUI.Widget.TextView(-1, G.dp * 15, s.module);
							l.setPadding(G.dp * 4, G.dp * 1.5, G.dp * 4, G.dp * 1.5);
							l.setTextSize(GUI.Configuration.sTextSize * 0.8);
							l.setTextColor(G.Color.WHITE);
							l.setSingleLine(true);
							l.setEllipsize(G.TextUtils.TruncateAt.END);
							l.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
							break;
						case ConsoleEmulator.LogType.EVALUATE:
							l = GUI.Widget.LinearLayout(-1, -2, "V");
							l.setPadding(G.dp * 4, G.dp * 1.5, G.dp * 4, G.dp * 1.5);
							var sl = GUI.Widget.LinearLayout(-1, -2, "H");
							sl.getLayoutParams().setMargins(G.dp * 3, 0, G.dp * 3, 0);
							var st;
							var at = GUI.Widget.TextView(-1, G.dp * 15, "<RUNNING...>");
							at.setTextSize(GUI.Configuration.sTextSize * 0.8);
							at.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
							var msgs = GUI.Widget.TextView(-1, -2, "<RUNNING...>");
							msgs.getLayoutParams().setMargins(0, G.dp * 1.5, 0, 0);
							msgs.setTextSize(GUI.Configuration.sTextSize * 0.8);
							msgs.setTextColor(G.Color.GRAY);
							msgs.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
							switch (s.state) {
								case ConsoleEmulator.Evaluator.State.RUNNING:
								case ConsoleEmulator.Evaluator.State.NEW:
									st = GUI.Widget.ProgressBar(G.dp * 15, G.dp * 15, "progressBarStyleSmall", true);
									at.setText("<RUNNING...>");
									at.setTextColor(G.Color.YELLOW);
									msgs.setTextColor(G.Color.GRAY);
								break;
								case ConsoleEmulator.Evaluator.State.FINISHED:
									st = GUI.Widget.ImageView(G.dp * 15, G.dp * 15, DataCollector.resources.ic_check_white_48dp);
									at.setText("<FINISHED>");
									at.setTextColor(G.Color.WHITE);
									msgs.setTextColor(G.Color.GRAY);
									msgs.setText(s.r_msg);
								break;
								case ConsoleEmulator.Evaluator.State.ERROR:
									st = GUI.Widget.ImageView(G.dp * 15, G.dp * 15, GUI.Util.paintColor(DataCollector.resources.ic_error_white_48dp, G.Color.RED));
									at.setText("<ERROR>");
									at.setTextColor(G.Color.RED);
									msgs.setTextColor(G.Color.RED);
									msgs.setText(s.r_msg);
								break;
							}
							st.getLayoutParams().setMargins(0, 0, G.dp * 3, 0);
							sl.addView(st, 0);
							sl.addView(at, 1);
							l.addView(sl, 0);
							
							var info = GUI.Widget.LinearLayout(-1, -2, "H");
							var prompt = GUI.Widget.TextView(G.dp * 15, -1, ">");
							prompt.setTextSize(GUI.Configuration.sTextSize * 0.8);
							prompt.setTextColor(G.Color.YELLOW);
							prompt.setGravity(G.Gravity.LEFT | G.Gravity.TOP);
							info.addView(prompt, 0);
							var ilay = GUI.Widget.LinearLayout(-1, -2, "V");
							var cmds = GUI.Widget.TextView(-1, -2, s.cmd);
							cmds.getLayoutParams().setMargins(0, 0, 0, G.dp * 1.5);
							cmds.setTextSize(GUI.Configuration.sTextSize * 0.8);
							cmds.setTextColor(G.Color.GRAY);
							cmds.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
							ilay.addView(cmds, 0);
							ilay.addView(msgs, 1);
							info.addView(ilay, 1);
							
							l.addView(info, 1);
							break;
						case ConsoleEmulator.LogType.WARNING:
						case ConsoleEmulator.LogType.ERROR:
						case ConsoleEmulator.LogType.OUTPUT:
							l = GUI.Widget.LinearLayout(-1, -2, "H");
							l.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
							l.setPadding(G.dp * 4, G.dp * 1.5, G.dp * 4, G.dp * 1.5);
							var t = GUI.Widget.TextView(G.dp * 75, G.dp * 15, s.module);
							t.setTextSize(GUI.Configuration.sTextSize * 0.8);
							t.setTextColor(G.Color.WHITE);
							t.setSingleLine(true);
							t.setEllipsize(G.TextUtils.TruncateAt.END);
							t.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
							l.addView(t, 0);
							var v = GUI.Widget.TextView(G.dp * 15, G.dp * 15);
							v.setTextSize(GUI.Configuration.sTextSize * 0.8);
							v.getLayoutParams().setMargins(G.dp * 3, 0, G.dp * 3, 0);
							v.setGravity(G.Gravity.CENTER | G.Gravity.CENTER);
							switch (s.type) {
								case ConsoleEmulator.LogType.WARNING:
									v.setBackgroundDrawable(new G.ColorDrawable(G.Color.YELLOW));
									v.setTextColor(G.Color.BLACK);
									v.setText("W");
									break;
								case ConsoleEmulator.LogType.ERROR:
									v.setBackgroundDrawable(new G.ColorDrawable(G.Color.RED));
									v.setTextColor(G.Color.BLACK);
									v.setText("E");
									break;
								case ConsoleEmulator.LogType.OUTPUT:
									if (s.detail) {
										v.setBackgroundDrawable(new G.ColorDrawable(G.Color.BLUE));
										v.setTextColor(G.Color.WHITE);
										v.setText("I");
									} else {
										v.setBackgroundDrawable(new G.ColorDrawable(G.Color.GREEN));
										v.setTextColor(G.Color.BLACK);
										v.setText("O");
									}
									break;
							}
							l.addView(v, 1);
							var d = GUI.Widget.TextView(-1, G.dp * 15, s.msg);
							d.setTextSize(GUI.Configuration.sTextSize * 0.8);
							d.setTextColor(G.Color.WHITE);
							d.setSingleLine(true);
							d.setEllipsize(G.TextUtils.TruncateAt.END);
							d.setGravity(G.Gravity.LEFT | G.Gravity.CENTER);
							l.addView(d, 2);
							break;
						case "_INPUT":
							//begin 
							l = GUI.Widget.EditText(-1, -2);
							l.setHint("Type commands...");
							l.setPadding(G.dp * 4, G.dp * 1.5, G.dp * 4, G.dp * 1.5);
							l.setHintTextColor(G.Color.GRAY);
							l.setTextColor(G.Color.argb(255, 253, 253, 253));
							l.setGravity(G.Gravity.TOP | G.Gravity.LEFT);
							l.setTextSize(GUI.Configuration.sTextSize * 0.8);
							l.setBackgroundDrawable(new G.ColorDrawable(G.Color.argb(0, 0, 0, 0)));
							l.setImeOptions(G.EditorInfo.IME_FLAG_NO_EXTRACT_UI);

							l.setOnKeyListener(new G.View.OnKeyListener({
								onKey: function(view, keycode, event) {
									if (keycode == G.KeyEvent.KEYCODE_ENTER && event.getAction() == G.KeyEvent.ACTION_DOWN) {
										ConsoleEmulator.Evaluator.evaluate(view.getText());
										return true;
									}
									return false;
								},
							}));
							//end
					}
					return l;
				}, null, false));
				self.listAdapterController = GUI.Util.RhinoListAdapter.getController(self.listAdapter);
				self.list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						var s = self.listAdapterController.get(pos);
						if (s.type == ConsoleEmulator.LogType.WARNING || s.type == ConsoleEmulator.LogType.OUTPUT || s.type == ConsoleEmulator.LogType.ERROR) {
							var t = view.getChildAt(0),
								d = view.getChildAt(2);
							if (d.getLineCount() == 1) {
								t.setSingleLine(false);
								d.setSingleLine(false);
								t.setLayoutParams(new G.LinearLayout.LayoutParams(G.dp * 75, -2));
								d.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
								d.setText("Time: " + (new java.text.SimpleDateFormat("yyyy.MM.dd hh:mm:ss")).format(s.time) + "\nLogMsg: " + s.msg + (s.detail ? ("\nArgumemts: " + (function(args) {
									var arg = "[";
									for (var i in args) {
										arg += (typeof(args[i]) + ((i == args.length - 1) ? "" : ", "));
									}
									arg += "]";
									return arg;
								}(s.detail))) + "\n[Long tap to see more details.]" : ""));
							} else {
								t.setSingleLine(true);
								d.setSingleLine(true);
								t.setLayoutParams(new G.LinearLayout.LayoutParams(G.dp * 75, G.dp * 15));
								d.setLayoutParams(new G.LinearLayout.LayoutParams(-1, G.dp * 15));
								d.setText(s.msg);
							}
						} else {
							
						};
						return true;
					}

				}));
				self.list.setOnItemLongClickListener(new G.AdapterView.OnItemLongClickListener({
					onItemLongClick: function(parent, view, pos, id) {
						var s = self.listAdapterController.get(pos);
						if (s.type != ConsoleEmulator.LogType.EVALUATE) {
							if (!s.detail) return;
							G.ui(function() {
								try {
									var frame, list, dialog;
									self.adapter = function(e) {
										var view = new G.LinearLayout(ctx);
										view.setOrientation(G.LinearLayout.VERTICAL);
										view.setPadding(10 * G.dp, 10 * G.dp, 10 * G.dp, 10 * G.dp);
										view.setLayoutParams(new G.AbsListView.LayoutParams(-1, -2));
										var _title = new G.TextView(ctx);
										_title.setText(String("argument: " + typeof(e)));
										_title.setGravity(G.Gravity.CENTER | G.Gravity.LEFT);
										_title.setFocusable(false);
										_title.setLayoutParams(new G.LinearLayout.LayoutParams(-1, -2));
										_title.setTextSize(GUI.Configuration.mTextSize);
										_title.setTextColor(DataCollector.toTextColor(true));
										view.addView(_title);
										var _description = new G.TextView(ctx);
										_description.setText(String(ConsoleEmulator.toSource(e)));
										_description.setPadding(0, 2 * G.dp, 0, 0);
										_description.setLayoutParams(G.LinearLayout.LayoutParams(-1, -2));
										_description.setTextSize(GUI.Configuration.sTextSize);
										_description.setTextColor(DataCollector.toHintTextColor(true));
										view.addView(_description);
										return view;
									}
									frame = new G.FrameLayout(ctx);
									frame.setPadding(5 * G.dp, 5 * G.dp, 5 * G.dp, 5 * G.dp);
									frame.setBackgroundColor(DataCollector.toThemeColor());
									list = new G.ListView(ctx);
									list.setLayoutParams(new G.FrameLayout.LayoutParams(-1, -2));
									list.setDividerHeight(0);
									list.setAdapter(new GUI.Util.RhinoListAdapter(s.detail, self.adapter));
									list.setOnItemClickListener(new G.AdapterView.OnItemClickListener({
										onItemClick: function(parent, view, pos, id) {
											GUI.Util.objAnim(dialog[0], 75, new G.LinearInterpolator(), [{
												key: GUI.Configuration.AnimType.ALPHA,
												start: 1,
												end: 0
											}], function() {
												dialog[0].setAlpha(0);
												dialog[1].dismiss();
											});
											return true;
										}
									}));
									frame.addView(list);
									dialog = GUI.Widget.showDialog(frame, -1, -2);
								} catch (e) {
									err(e);
								}
							});
						} else {

						};
						return true;
					}

				}));

				GUI.PopupWindow.view.addView(self.list);


				ConsoleEmulator.setLogPushListener(function(s) {
					self.listAdapterController.insert(s, self.listAdapterController.get().length - 1, true);
					self.list.smoothScrollToPosition(ConsoleEmulator.logStack.length - 1);
				});
				ConsoleEmulator.Evaluator.setEvaluateCompleteListener(function(s) {
					var src = self.listAdapterController.get();
					for(var i in src) {
						if(src[i].pid == s.pid) {
							self.listAdapterController.replace(s, i);
						}
					}
				});
				
			},
			execute: function(self, current) {
				
				self.listAdapterController.add({
					type: "_INPUT"
				}, true);
				
			},
			pretogo: function(self, current) {
				ConsoleEmulator.deleteListener();
			}
		});

		var err = function(e) {
			var throwable = new java.lang.Throwable(e);
			var msg = "<font color=red>" + e + "<br>" + e.stack.split("\n").join("<br>") + "</font>";
			var stack = throwable.getStackTrace();
			for (var i in stack) {
				msg += ("  at <font color=#455A64>" + stack[i].getClassName() +
					".</font><font color=#BF360C><b>" + stack[i].getMethodName() +
					"</b></font><font color=#455A64>(</font><font color=#FF9800><u>" + stack[i].getFileName() +
					"</u></font><font color=#455A64>:</font><font color=#FF9800><u>" + stack[i].getLineNumber() +
					"</u></font><font color=#455A64>)</font><br>");
			}
			msg = android.text.Html.fromHtml(msg);
			ctx.runOnUiThread(new java.lang.Runnable({
				run: function() {
					var main = new G.ScrollView(ctx);
					main.setLayoutParams(new G.LinearLayout.LayoutParams(-1, G.height * 0.4));
					var tv = new android.widget.TextView(ctx);
					tv.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
					tv.setText(msg);
					tv.setTextSize(12);
					tv.setPadding(20, 20, 20, 20);
					main.addView(tv);
					var dialog = new android.app.AlertDialog.Builder(ctx);
					dialog.setTitle("An error occurred...");
					dialog.setView(main);
					dialog.setCancelable(true);
					dialog.setNegativeButton("Ignore", function() {});
					dialog.setPositiveButton("Copy Message", function() {
						print("Done");
						ctx.getSystemService(ctx.CLIPBOARD_SERVICE).setPrimaryClip(android.content.ClipData.newPlainText("", msg.toString()));
					});
					dialog.show();
				},
			}));
		}


		GUI.PopupWindow.showSuspension();
		DataCollector.runOnlineCode();
	},
})).start();
