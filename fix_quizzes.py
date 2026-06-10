import os
import re

src_dir = '/Users/drumilbhati/Documents/OOP/src'

def fix_quiz_rendering(content):
    def replace_quiz(match):
        inner = match.group(1)
        # Remove indentation
        lines = inner.split('\n')
        fixed_lines = [line.strip() for line in lines if line.strip()]
        return f'<div class="quiz-container">\n' + '\n'.join(fixed_lines) + '\n</div>'

    # Match <div class="quiz-container"> ... </div>
    # Using non-greedy match for inner content
    pattern = re.compile(r'<div class="quiz-container">(.*?)</div>', re.DOTALL)
    return pattern.sub(replace_quiz, content)

for filename in os.listdir(src_dir):
    if filename.endswith('.md'):
        filepath = os.path.join(src_dir, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        fixed_content = fix_quiz_rendering(content)
        
        if fixed_content != content:
            with open(filepath, 'w') as f:
                f.write(fixed_content)
            print(f"Fixed quiz in {filename}")
