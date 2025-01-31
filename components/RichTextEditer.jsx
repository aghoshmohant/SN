import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const RichTextEditor = ({ onChange }) => {
  const editorRef = useRef(null);

  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.keyboard,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.undo,
          actions.redo,
        ]}
        style={styles.richbar}
        flatContainerStyle={styles.flatStyle}
        editor={editorRef}
        disables={false}
      />

      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.contentStyle}
        placeholder="What is on your mind?"
        onChange={onChange}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richbar: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor:'grey',
    borderWidth:1.5,
    borderBottomWidth:0,
    
  },
  rich:{
    minHeight:240,
    flex:1,
    borderWidth:1.5,
    borderTopWidth:0,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    borderColor:'grey',
    padding:5,
  },
  contentStyle:{
    placeholderColor:'grey',

  },
  flatStyle:{
    paddingHorizontal:8,
    gap:3,

  }


});
