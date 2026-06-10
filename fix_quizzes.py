import os
import re

def fix_quiz_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix quiz-question: Ensure <span class="quiz-feedback-inline"></span> is present
    def q_sub(m):
        txt = m.group(1)
        if 'quiz-feedback-inline' not in txt:
            # Remove any trailing whitespace or punctuation before adding span if appropriate, 
            # but usually we just append it.
            txt = txt.rstrip()
            return f'<div class="quiz-question">{txt} <span class="quiz-feedback-inline"></span></div>'
        return m.group(0)
    
    content = re.sub(r'<div class="quiz-question">(.*?)</div>', q_sub, content)

    # 2. Remove quiz-feedback divs (the separate ones)
    content = re.sub(r'\s*<div class="quiz-feedback"></div>', '', content)
    
    # 3. Fix the footer - Case 1: Button before Feedback-main
    # Pattern: <button class="quiz-check-btn">...</button> followed by <div class="quiz-feedback-main"></div>
    content = re.sub(r'(<button class="quiz-check-btn">.*?</button>)\s*(<div class="quiz-feedback-main"></div>)', 
                     r'\2\n    \1', content)

    # 4. Fix the footer - Case 2: Malformed block (like in ch03-02)
    # <div class="quiz-feedback-main">\s*<button class="quiz-check-btn">Check Answers</button>\s*<p class="quiz-result"></p>\s*</div>
    content = re.sub(r'<div class="quiz-feedback-main">\s*(<button class="quiz-check-btn">.*?</button>)\s*<p class="quiz-result"></p>\s*</div>',
                     r'<div class="quiz-feedback-main"></div>\n    \1', content)

    # 5. Ensure correct indentation for the re-ordered elements
    # (Optional but good for consistency)
    
    return content

src_dir = '/Users/drumilbhati/Documents/OOP/src/'
files = [f for f in os.listdir(src_dir) if f.endswith('.md') and f.startswith('ch')]

count = 0
for filename in files:
    file_path = os.path.join(src_dir, filename)
    with open(file_path, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    new_content = fix_quiz_file(file_path)
    
    if original_content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Fixed {filename}")

print(f"Total files fixed: {count}")
