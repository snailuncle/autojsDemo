importClass(android.content.ContentUris);
importClass(android.content.ContentValues);
importClass(android.content.Context);
importClass(android.net.Uri);
importClass(android.provider.ContactsContract);


addContact(context, "咸鱼", "187678484464");

function addContact(context, name, phoneNumber) {
    try {
        var values = new ContentValues();

        var rawContactUri = context.getContentResolver().insert(ContactsContract.RawContacts.CONTENT_URI, values);
        var rawContactId = ContentUris.parseId(rawContactUri);
        values.clear();
        values.put(ContactsContract.Data.RAW_CONTACT_ID, new java.lang.Integer(rawContactId));
        values.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE);
        values.put(ContactsContract.CommonDataKinds.StructuredName.GIVEN_NAME, name);
        context.getContentResolver().insert(ContactsContract.Data.CONTENT_URI, values);
        values.clear();

        values.put(ContactsContract.Data.RAW_CONTACT_ID, new java.lang.Integer(rawContactId));
        values.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE);
        values.put(ContactsContract.CommonDataKinds.Phone.NUMBER, phoneNumber);
        values.put(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE);
        context.getContentResolver().insert(ContactsContract.Data.CONTENT_URI, values);
        values.clear();

        //以下为插入e-mail信息，不需要可以注释掉
        //    values.put(ContactsContract.Data.RAW_CONTACT_ID, rawContactId);
        //    values.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE);
        //    // 联系人的Email地址
        //    values.put(ContactsContract.CommonDataKinds.Email.DATA, "zhangphil@xxx.com");
        //    // 电子邮件的类型
        //    values.put(ContactsContract.CommonDataKinds.Email.TYPE,ContactsContract.CommonDataKinds.Email.TYPE_WORK);
        //    // 向联系人Email URI添加Email数据
        //    context.getContentResolver().insert(ContactsContract.Data.CONTENT_URI, values);

        toast("联系人数据添加成功");
        return true;
    } catch (e) {
        return false;
    }
}