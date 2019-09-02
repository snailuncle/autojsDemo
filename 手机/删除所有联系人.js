
/**
 * @功能 删除所有联系人, 除了  禁止删除的联系人手机号码
 * @作者 家
 * @改编自 仁太发在Rro群文件的联系人脚本
 */


/* 本例子中的联系人contact的结构如下：
    {
        number: '131123234',
        name: '小明',
        city: '北京'
    }
*/
let Phone = android.provider.ContactsContract.CommonDataKinds.Phone;
let ContentValues = android.content.ContentValues;
let ContentUris = android.content.ContentUris;
let ContactsContract = android.provider.ContactsContract;

// alert("警告", "将会请求联系人权限。为了保证自己的通讯录不被其他脚本泄漏或破坏，请运行本脚本后手动禁止读写联系人权限。")
// 请求联系人权限
runtime.requestPermissions(["read_contacts", "write_contacts"]);

// insertOrUpdateContact({
//     number: '662377009',
//     name: 'Auto.js Pro',
//     city: '上海'
// });

// 首次运行会出错，因为读写联系人权限还没授予，很正常
log(getAllContacts());
// { name: '地球人', contactId: '15', number: '1347456465465415' },
// { name: '车3453下', contactId: '1' },

禁止删除的联系人手机号码 = ['18888888888']

var 所有联系人 = 获取所有联系人()
遍历删除联系人(所有联系人)

function 获取所有联系人() {
  return getAllContacts()
}

function 遍历删除联系人(allContacts) {
  allContacts.map(
    contact => {
      if (!是否禁止删除的联系人(contact)) {
        删除联系人(contact)
      }
    }
  )
}

function 是否禁止删除的联系人(contact) {
  if (contact && contact.number) {

    contact.number = contact.number.replace(/ /g, '')
    if (禁止删除的联系人手机号码.indexOf(contact.number) > -1) {

      log(contact)
      log(' 是禁止删除的联系人')
      return true

    }
  }
}

function 删除联系人(contact) {
  deleteContact(contact)
}

// 根据联系人号码删除联系人
function deleteContact(contact) {
  if (contact.number) { } else { return false }
  let contactId = queryContactId(contact.number);
  console.log("删除联系人: id = %s, 内容 = ", contactId, contact);
  if (contactId === undefined) {
    console.warn("失败: 联系人不存在");
    return false;
  }
  context.contentResolver.delete(ContactsContract.Data.CONTENT_URI,
    ContactsContract.Data.RAW_CONTACT_ID + " = " + contactId, null);
  context.contentResolver.delete(ContactsContract.RawContacts.CONTENT_URI,
    "_id = " + contactId, null);
  console.log("成功");
  return true;
}

// 插入或更新联系人
function insertOrUpdateContact(contact) {
  let contactId = queryContactId(contact.number);
  if (contactId === undefined) {
    contactId = insertRawContact();
  }
  console.log("插入联系人: id = %s, 内容 = ", contactId, contact);
  insertContactData(contactId, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE,
    ContactsContract.CommonDataKinds.StructuredName.GIVEN_NAME, contact.name);
  insertContactData(contactId, ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE,
    ContactsContract.CommonDataKinds.StructuredPostal.CITY, contact.city);
  insertContactData(contactId, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
    ContactsContract.CommonDataKinds.Phone.NUMBER, contact.number,
    ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE
  );
  console.log("成功");
  return contactId;
}

// 根据号码查询联系人的ID
function queryContactId(number) {
  let cursor = context.contentResolver.query(ContactsContract.Data.CONTENT_URI, null, ContactsContract.CommonDataKinds.Phone.NUMBER + " = '" + number + "' AND "
    + ContactsContract.Data.MIMETYPE + " = '" + ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE + "'", null, null);
  if (cursor.moveToFirst()) {
    return cursor.getLong(cursor.getColumnIndex(ContactsContract.Data.RAW_CONTACT_ID));
  }
  return undefined;
}

function insertRawContact() {
  let values = new ContentValues();
  let rawContactUri = context.contentResolver.insert(ContactsContract.RawContacts.CONTENT_URI, values);
  let contactId = ContentUris.parseId(rawContactUri);
  return contactId;
}

function insertContactData(rawContactId, itemType) {
  let values = new ContentValues()
  with (values) {
    put(ContactsContract.Data.RAW_CONTACT_ID, new java.lang.Long(rawContactId));
    put(ContactsContract.Data.MIMETYPE, itemType);
    for (let i = 2; i < arguments.length; i += 2) {
      let key = arguments[i];
      let value = arguments[i + 1];
      if (typeof (value) == 'number') {
        put(key, new java.lang.Long(value));
      } else {
        put(key, value);
      }
    }
  }
  context.contentResolver.insert(ContactsContract.Data.CONTENT_URI, values)
}

// 获取所有联系人
function getAllContacts() {
  let contacts = [];
  let cursor = context.contentResolver.query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);
  while (cursor.moveToNext()) {
    let contact = {};
    contact.name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
    let contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
    contact.contactId = contactId;
    //contact.rawContactId = cursor.getLong(cursor.getColumnIndex(ContactsContract.Data.RAW_CONTACT_ID));
    let phones = context.contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,
      ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId, null, null);
    if (phones.moveToFirst()) {
      contact.number = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
    }
    phones.close()
    contacts.push(contact);
  }
  cursor.close()
  return contacts;
}