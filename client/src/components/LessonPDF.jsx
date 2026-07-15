import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    paddingBottom: 60,
    fontFamily: 'Helvetica',
    color: '#000000' // Changed from #333333 to pure black for maximum brightness
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    fontWeight: 'bold' 
  },
  heading: { 
    fontSize: 18, 
    marginTop: 20, 
    marginBottom: 10,
    fontWeight: 'bold' 
  },
  paragraph: { 
    fontSize: 12, 
    marginBottom: 12, 
    lineHeight: 1.5,
    color: '#1f2937' // Dark gray, very readable
  },
  
  // --- Code Blocks ---
  codeContainer: {
    backgroundColor: '#f9fafb', // Lighter background for better contrast
    padding: 15,
    borderRadius: 6,
    marginBottom: 15,
    border: '1pt solid #e5e7eb' // Added a subtle border to define the block
  },
  codeLanguage: {
    fontSize: 9,
    color: '#4b5563', // Darker gray for the label
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  codeText: {
    fontFamily: 'Courier', 
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000000', // Black text for code
  },

  // --- MCQ Blocks ---
  mcqContainer: {
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
    border: '1pt solid #d1d5db', // Darker border
    borderRadius: 8,
    backgroundColor: '#ffffff' // White background
  },
  mcqQuestion: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000'
  },
  mcqOption: {
    fontSize: 12, // Slightly larger
    marginBottom: 8,
    paddingLeft: 5,
    color: '#1f2937' // Darker text
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#1f2937',
    textAlign: 'center',
  }
});

export const LessonPDF = ({ title, content }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      
      {Array.isArray(content) && content.map((block, i) => {
        if (block.type === 'heading') return <Text key={i} style={styles.heading}>{block.text}</Text>;
        if (block.type === 'paragraph') return <Text key={i} style={styles.paragraph}>{block.text}</Text>;
        
        if (block.type === 'code') {
          return (
            <View key={i} style={styles.codeContainer} wrap={false}>
               {block.language && <Text style={styles.codeLanguage}>{block.language}</Text>}
               <Text style={styles.codeText}>{block.text}</Text>
            </View>
          );
        }
        
        if (block.type === 'mcq') {
          return (
            <View key={i} style={styles.mcqContainer} wrap={false}>
              <Text style={styles.mcqQuestion}>Review: {block.question}</Text>
              {block.options?.map((opt, optIdx) => (
                 <Text key={optIdx} style={styles.mcqOption}>• {opt}</Text>
              ))}
            </View>
          );
        }
        return null;
      })}

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} • Text-to-Learn`}
        fixed
      />
    </Page>
  </Document>
);